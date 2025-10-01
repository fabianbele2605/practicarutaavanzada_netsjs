import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { QueryTournamentDto } from './dto/query-tournament.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Tournament } from 'generated/prisma';

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  async create(createTournamentDto: CreateTournamentDto, organizerId: string): Promise<Tournament> {
    const { startDate, endDate, ...rest } = createTournamentDto;

    // Validar fechas
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (start < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    return this.prisma.tournament.create({
      data: {
        ...rest,
        startDate: start,
        endDate: end,
        organizerId,
      },
      include: {
        organizer: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async findAll(query: QueryTournamentDto) {
    const { search, status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    const [tournaments, total] = await Promise.all([
      this.prisma.tournament.findMany({
        where,
        skip,
        take: limit,
        include: {
          organizer: {
            select: { id: true, name: true, email: true }
          },
          _count: {
            select: { teams: true, matches: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.tournament.count({ where })
    ]);

    return {
      tournaments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: string): Promise<Tournament> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { id: true, name: true, email: true }
        },
        teams: true,
        matches: {
          include: {
            homeTeam: { select: { id: true, name: true } },
            awayTeam: { select: { id: true, name: true } }
          }
        }
      }
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return tournament;
  }

  async update(id: string, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
    const tournament = await this.prisma.tournament.findUnique({ where: { id } });
    
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    const { startDate, endDate, ...rest } = updateTournamentDto;
    const data: any = { ...rest };

    // Validar fechas si se proporcionan
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : tournament.startDate;
      const end = endDate ? new Date(endDate) : tournament.endDate;

      if (start >= end) {
        throw new BadRequestException('Start date must be before end date');
      }

      if (startDate) data.startDate = start;
      if (endDate) data.endDate = end;
    }

    return this.prisma.tournament.update({
      where: { id },
      data,
      include: {
        organizer: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  async remove(id: string): Promise<Tournament> {
    const tournament = await this.prisma.tournament.findUnique({ where: { id } });
    
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }

    return this.prisma.tournament.delete({
      where: { id },
      include: {
        organizer: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }
}
