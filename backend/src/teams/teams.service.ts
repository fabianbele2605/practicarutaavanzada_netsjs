import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { QueryTeamDto } from './dto/query-team.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Team } from 'generated/prisma';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { tournamentId, name, ...rest } = createTeamDto;

    // Verificar que el torneo existe
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { _count: { select: { teams: true } } }
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${tournamentId} not found`);
    }

    // Verificar límite de equipos
    if (tournament._count.teams >= tournament.maxTeams) {
      throw new BadRequestException(`Tournament has reached maximum teams limit (${tournament.maxTeams})`);
    }

    // Verificar que no existe equipo con el mismo nombre en el torneo
    const existingTeam = await this.prisma.team.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        tournamentId
      }
    });

    if (existingTeam) {
      throw new ConflictException(`Team with name "${name}" already exists in this tournament`);
    }

    return this.prisma.team.create({
      data: {
        ...rest,
        name,
        tournamentId,
      },
      include: {
        tournament: {
          select: { id: true, name: true, maxTeams: true }
        },
        _count: {
          select: { players: true }
        }
      }
    });
  }

  async findAll(query: QueryTeamDto) {
    const { search, tournamentId, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    if (tournamentId) {
      where.tournamentId = tournamentId;
    }

    const [teams, total] = await Promise.all([
      this.prisma.team.findMany({
        where,
        skip,
        take: limit,
        include: {
          tournament: {
            select: { id: true, name: true, status: true }
          },
          _count: {
            select: { players: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.team.count({ where })
    ]);

    return {
      teams,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: {
        tournament: {
          select: { id: true, name: true, status: true, maxTeams: true }
        },
        players: {
          orderBy: { number: 'asc' }
        }
      }
    });

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.prisma.team.findUnique({ 
      where: { id },
      include: { tournament: true }
    });
    
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    // Si se actualiza el nombre, verificar que no exista otro con el mismo nombre
    if (updateTeamDto.name) {
      const existingTeam = await this.prisma.team.findFirst({
        where: {
          name: { equals: updateTeamDto.name, mode: 'insensitive' },
          tournamentId: team.tournamentId,
          id: { not: id }
        }
      });

      if (existingTeam) {
        throw new ConflictException(`Team with name "${updateTeamDto.name}" already exists in this tournament`);
      }
    }

    return this.prisma.team.update({
      where: { id },
      data: updateTeamDto,
      include: {
        tournament: {
          select: { id: true, name: true, status: true }
        },
        _count: {
          select: { players: true }
        }
      }
    });
  }

  async remove(id: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({ 
      where: { id },
      include: { _count: { select: { players: true } } }
    });
    
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    // Verificar si tiene jugadores
    if (team._count.players > 0) {
      throw new BadRequestException(`Cannot delete team with ${team._count.players} players. Remove players first.`);
    }

    return this.prisma.team.delete({
      where: { id },
      include: {
        tournament: {
          select: { id: true, name: true }
        }
      }
    });
  }
}
