import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';

describe('TeamsService', () => {
  let service: TeamsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    tournament: {
      findUnique: jest.fn(),
    },
    team: {
      findFirst: jest.fn(),
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
        TeamsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a team successfully', async () => {
      const createTeamDto = {
        name: 'Test Team',
        description: 'Test Description',
        tournamentId: 'tournament-123',
      };

      const mockTournament = {
        id: 'tournament-123',
        maxTeams: 8,
        _count: { teams: 2 }
      };

      const mockTeam = {
        id: 'team-123',
        ...createTeamDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.tournament.findUnique.mockResolvedValue(mockTournament);
      mockPrismaService.team.findFirst.mockResolvedValue(null);
      mockPrismaService.team.create.mockResolvedValue(mockTeam);

      const result = await service.create(createTeamDto);

      expect(result).toEqual(mockTeam);
      expect(mockPrismaService.tournament.findUnique).toHaveBeenCalledWith({
        where: { id: 'tournament-123' },
        include: { _count: { select: { teams: true } } }
      });
    });

    it('should throw NotFoundException if tournament not found', async () => {
      const createTeamDto = {
        name: 'Test Team',
        tournamentId: 'non-existent',
      };

      mockPrismaService.tournament.findUnique.mockResolvedValue(null);

      await expect(service.create(createTeamDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if tournament is full', async () => {
      const createTeamDto = {
        name: 'Test Team',
        tournamentId: 'tournament-123',
      };

      const mockTournament = {
        id: 'tournament-123',
        maxTeams: 4,
        _count: { teams: 4 }
      };

      mockPrismaService.tournament.findUnique.mockResolvedValue(mockTournament);

      await expect(service.create(createTeamDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if team name exists in tournament', async () => {
      const createTeamDto = {
        name: 'Existing Team',
        tournamentId: 'tournament-123',
      };

      const mockTournament = {
        id: 'tournament-123',
        maxTeams: 8,
        _count: { teams: 2 }
      };

      mockPrismaService.tournament.findUnique.mockResolvedValue(mockTournament);
      mockPrismaService.team.findFirst.mockResolvedValue({ id: 'existing-team' });

      await expect(service.create(createTeamDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return a team if found', async () => {
      const teamId = 'team-123';
      const mockTeam = {
        id: teamId,
        name: 'Test Team',
      };

      mockPrismaService.team.findUnique.mockResolvedValue(mockTeam);

      const result = await service.findOne(teamId);

      expect(result).toEqual(mockTeam);
    });

    it('should throw NotFoundException if team not found', async () => {
      const teamId = 'non-existent';

      mockPrismaService.team.findUnique.mockResolvedValue(null);

      await expect(service.findOne(teamId)).rejects.toThrow(NotFoundException);
    });
  });
});
