import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { execSync } from 'child_process';

describe('Database Seeder (e2e)', () => {
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should seed database with CSV data', async () => {
    // Ejecutar seeder
    execSync('npm run seed', { cwd: process.cwd() });

    // Verificar datos
    const users = await prisma.user.count();
    const tournaments = await prisma.tournament.count();
    const teams = await prisma.team.count();
    const players = await prisma.player.count();
    const matches = await prisma.match.count();

    expect(users).toBeGreaterThan(0);
    expect(tournaments).toBeGreaterThan(0);
    expect(teams).toBeGreaterThan(0);
    expect(players).toBeGreaterThan(0);
    expect(matches).toBeGreaterThan(0);
  });
});
