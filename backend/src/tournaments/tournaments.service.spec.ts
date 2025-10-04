import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsService } from './tournaments.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TournamentStatus } from 'generated/prisma';

describe('TournamentsService', () => {
  let service: TournamentsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    tournament: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TournamentsService>(TournamentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a tournament successfully', async () => {
      const createTournamentDto = {
        name: 'Test Tournament',
        description: 'Test Description',
        startDate: '2025-12-01T00:00:00.000Z',
        endDate: '2025-12-31T00:00:00.000Z',
        maxTeams: 8,
        status: TournamentStatus.UPCOMING,
      };

      const organizerId = 'user-123';
      const mockTournament = {
        id: 'tournament-123',
        ...createTournamentDto,
        organizerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.tournament.create.mockResolvedValue(mockTournament);

      const result = await service.create(createTournamentDto, organizerId);

      expect(result).toEqual(mockTournament);
      expect(mockPrismaService.tournament.create).toHaveBeenCalledWith({
        data: {
          name: createTournamentDto.name,
          description: createTournamentDto.description,
          maxTeams: createTournamentDto.maxTeams,
          status: createTournamentDto.status,
          startDate: new Date(createTournamentDto.startDate),
          endDate: new Date(createTournamentDto.endDate),
          organizerId,
        },
        include: {
          organizer: {
            select: { id: true, name: true, email: true }
          }
        }
      });
    });

    it('should throw BadRequestException if start date is after end date', async () => {
      const createTournamentDto = {
        name: 'Test Tournament',
        startDate: '2025-12-31T00:00:00.000Z',
        endDate: '2025-12-01T00:00:00.000Z',
        maxTeams: 8,
      };

      await expect(service.create(createTournamentDto, 'user-123'))
        .rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if start date is in the past', async () => {
      const createTournamentDto = {
        name: 'Test Tournament',
        startDate: '2020-01-01T00:00:00.000Z',
        endDate: '2020-12-31T00:00:00.000Z',
        maxTeams: 8,
      };

      await expect(service.create(createTournamentDto, 'user-123'))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a tournament if found', async () => {
      const tournamentId = 'tournament-123';
      const mockTournament = {
        id: tournamentId,
        name: 'Test Tournament',
      };

      mockPrismaService.tournament.findUnique.mockResolvedValue(mockTournament);

      const result = await service.findOne(tournamentId);

      expect(result).toEqual(mockTournament);
    });

    it('should throw NotFoundException if tournament not found', async () => {
      const tournamentId = 'non-existent';

      mockPrismaService.tournament.findUnique.mockResolvedValue(null);

      await expect(service.findOne(tournamentId))
        .rejects.toThrow(NotFoundException);
    });
  });
});
