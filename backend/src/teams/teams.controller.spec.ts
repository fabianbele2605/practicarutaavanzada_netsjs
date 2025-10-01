import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService;

  const mockTeamsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [{ provide: TeamsService, useValue: mockTeamsService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a team', async () => {
    const createTeamDto = {
      name: 'Test Team',
      tournamentId: 'tournament-123',
    };
    const result = { id: 'team-123', ...createTeamDto };

    mockTeamsService.create.mockResolvedValue(result);

    expect(await controller.create(createTeamDto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(createTeamDto);
  });

  it('should find all teams', async () => {
    const query = { page: 1, limit: 10 };
    const result = { teams: [], pagination: {} };

    mockTeamsService.findAll.mockResolvedValue(result);

    expect(await controller.findAll(query)).toBe(result);
    expect(service.findAll).toHaveBeenCalledWith(query);
  });

  it('should find one team', async () => {
    const id = 'team-123';
    const result = { id, name: 'Test Team' };

    mockTeamsService.findOne.mockResolvedValue(result);

    expect(await controller.findOne(id)).toBe(result);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a team', async () => {
    const id = 'team-123';
    const updateTeamDto = { name: 'Updated Team' };
    const result = { id, ...updateTeamDto };

    mockTeamsService.update.mockResolvedValue(result);

    expect(await controller.update(id, updateTeamDto)).toBe(result);
    expect(service.update).toHaveBeenCalledWith(id, updateTeamDto);
  });

  it('should remove a team', async () => {
    const id = 'team-123';
    const result = { id, name: 'Test Team' };

    mockTeamsService.remove.mockResolvedValue(result);

    expect(await controller.remove(id)).toBe(result);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
