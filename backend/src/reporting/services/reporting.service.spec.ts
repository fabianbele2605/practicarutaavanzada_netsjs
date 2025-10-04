import { Test, TestingModule } from "@nestjs/testing";
import { ReportingService } from "./reporting.service";
import { PrismaService } from "../../prisma/prisma.service";


describe('ReportingService', () => {
    let service: ReportingService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReportingService, 
                {
                    provide: PrismaService,
                    useValue: {
                        tournament: {
                            findMany: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<ReportingService>(ReportingService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return tournament stats', async () => {
        const mockTournaments = [
            {
                id: '1',
                name: 'Copa Test',
                startDate: new Date('2025-10-15'),
                endDate: new Date('2026-01-15'),
                status: 'ACTIVE',
                teams: [{ id: '1' }, { id: '2' }],
                matches: [
                    {
                        id: '1',
                        homeScore: 1,
                        awayScore: 0,
                        status: 'FINISHED',
                        homeTeam: { id: '1' },
                        awayTeam: { id: '2' }
                    }
                ]
            }
        ];

        jest.spyOn(prismaService.tournament, 'findMany').mockResolvedValue(mockTournaments);

        const result = await service.getTournamentStats();

        expect(result).toHaveLength(1);
        expect(result[0].tournamentName).toBe('Copa Test');
        expect(result[0].totalTeams).toBe(2);
        expect(result[0].totalMatches).toBe(1);
        expect(result[0].completedMatches).toBe(1);
        expect(result[0].totalGoals).toBe(1);
    })
});