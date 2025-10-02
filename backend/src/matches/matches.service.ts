import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { QueryMatchDto } from './dto/query-match.dto';
import { Match } from '@prisma/client';


@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const { matchDate, tournamentId, homeTeamId, awayTeamId } = createMatchDto;

    // Validar que los equipos no sean el mismo
    if (homeTeamId === awayTeamId) {
      throw new BadRequestException('A team cannot play against itself');
    }

    // Validar que ambos equipos pertenezcan al mismo torneo
    const [homeTeam, awayTeam] = await Promise.all([
      this.prisma.team.findUnique({ where: { id: homeTeamId } }),
      this.prisma.team.findUnique({ where: { id: awayTeamId } })
    ]);

    if (!homeTeam || !awayTeam) {
      throw new NotFoundException('One or both teams not found');
    }

    if (homeTeam.tournamentId !== tournamentId || awayTeam.tournamentId !== tournamentId) {
      throw new BadRequestException('Both teams must belong to the specified tournament');
    }

    return this.prisma.match.create({
      data: {
        matchDate: new Date(matchDate),
        tournamentId,
        homeTeamId,
        awayTeamId,
      },
      include: {
        tournament: { select: { id: true, name: true } },
        homeTeam: { select: { id: true, name: true } },
        awayTeam: { select: { id: true, name: true } }
      }
    });
  }

  async findAll(query: QueryMatchDto): Promise<Match[]> {
    const { tournamentId, homeTeamId, awayTeamId, matchDate, status } = query;
    const filters: any = {};

    if (tournamentId) {
      filters.tournamentId = tournamentId;
    }

    if (homeTeamId) {
      filters.homeTeamId = homeTeamId;
    }

    if (awayTeamId) {
      filters.awayTeamId = awayTeamId;
    }
    if (matchDate) {
        filters.matchDate = new Date(matchDate);
    }
    if (status) {
        filters.status = status;
    }

    return this.prisma.match.findMany({
      where: filters,
      include: {
        tournament: { select: { id: true, name: true } },
        homeTeam: { select: { id: true, name: true } },
        awayTeam: { select: { id: true, name: true } }
      },
      orderBy: { matchDate: 'asc' }
    });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: {
        tournament: { select: { id: true, name: true } },
        homeTeam: { select: { id: true, name: true } },
        awayTeam: { select: { id: true, name: true } }
      }
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return match;
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const existingMatch = await this.prisma.match.findUnique({ where: { id } });

    if (!existingMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    const { homeTeamId, awayTeamId, tournamentId } = updateMatchDto;

    // Validar que los equipos no sean el mismo
    if (homeTeamId && awayTeamId && homeTeamId === awayTeamId) {
      throw new BadRequestException('A team cannot play against itself');
    }

    // Validar que ambos equipos pertenezcan al mismo torneo si se están actualizando
    if (homeTeamId || awayTeamId) {
      const [homeTeam, awayTeam] = await Promise.all([
        homeTeamId ? this.prisma.team.findUnique({ where: { id: homeTeamId } }) : null,
        awayTeamId ? this.prisma.team.findUnique({ where: { id: awayTeamId } }) : null
      ]);

      if (homeTeamId && !homeTeam) {
        throw new NotFoundException('Home team not found');
      }

      if (awayTeamId && !awayTeam) {
        throw new NotFoundException('Away team not found');
      }

      // Validar que los equipos pertenezcan al torneo correcto
      const targetTournamentId = tournamentId || existingMatch.tournamentId;
      if (homeTeam && homeTeam.tournamentId !== targetTournamentId) {
        throw new BadRequestException('Home team must belong to the specified tournament');
      }
      if (awayTeam && awayTeam.tournamentId !== targetTournamentId) {
        throw new BadRequestException('Away team must belong to the specified tournament');
      }
    }

    return this.prisma.match.update({
      where: { id },
      data: {
        ...updateMatchDto,
        ...(updateMatchDto.matchDate && { matchDate: new Date(updateMatchDto.matchDate) })
      },
      include: {
        tournament: { select: { id: true, name: true } },
        homeTeam: { select: { id: true, name: true } },
        awayTeam: { select: { id: true, name: true } }
      }
    });
  }

  async remove(id: string): Promise<Match> {
    const existingMatch = await this.prisma.match.findUnique({ where: { id } });

    if (!existingMatch) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return this.prisma.match.delete({
      where: { id },
      include: {
        tournament: { select: { id: true, name: true } },
        homeTeam: { select: { id: true, name: true } },
        awayTeam: { select: { id: true, name: true } }
      }
    });
  }
}



