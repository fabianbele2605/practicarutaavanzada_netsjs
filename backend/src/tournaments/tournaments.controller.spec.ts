import { Test, TestingModule } from '@nestjs/testing';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('TournamentsController', () => {
  let controller: TournamentsController;
  let service: TournamentsService;

  const mockTournamentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentsController],
      providers: [{ provide: TournamentsService, useValue: mockTournamentsService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TournamentsController>(TournamentsController);
    service = module.get<TournamentsService>(TournamentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a tournament', async () => {
    const createTournamentDto = {
      name: 'Test Tournament',
      startDate: '2024-12-01T00:00:00.000Z',
      endDate: '2024-12-31T00:00:00.000Z',
      maxTeams: 8,
    };
    const req = { user: { id: 'user-123' } };
    const result = { id: 'tournament-123', ...createTournamentDto };

    mockTournamentsService.create.mockResolvedValue(result);

    expect(await controller.create(createTournamentDto, req)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(createTournamentDto, 'user-123');
  });

  it('should find all tournaments', async () => {
    const query = { page: 1, limit: 10 };
    const result = { tournaments: [], pagination: {} };

    mockTournamentsService.findAll.mockResolvedValue(result);

    expect(await controller.findAll(query)).toBe(result);
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('should find one tournament', async () => {
    const id = 'tournament-123';
    const result = { id, name: 'Test Tournament' };

    mockTournamentsService.findOne.mockResolvedValue(result);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });
});
