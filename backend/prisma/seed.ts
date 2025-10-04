import { PrismaClient } from "../generated/prisma";
import * as fs from 'fs';
import csv from 'csv-parser';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';

const prisma = new PrismaClient();

interface UserCSV {
  email: string;
  password: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface TournamentCSV {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxTeams: string;
  organizerEmail: string;
}

interface TeamCSV {
  name: string;
  description: string;
  tournamentName: string;
}

interface PlayerCSV {
  name: string;
  position: string;
  number: string;
  teamName: string;
}

interface MatchCSV {
  matchDate: string;
  homeTeamName: string;
  awayTeamName: string;
  tournamentName: string;
  homeScore: string;
  awayScore: string;
  status: string;
}

function readCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

async function main() {
  console.log('🌱 Iniciando seeding de la base de datos...');

  // Limpiar datos existentes
  await prisma.match.deleteMany();
  await prisma.player.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.user.deleteMany();

  // 1. Crear usuarios
  console.log('👥 Creando usuarios...');
  const usersData = await readCSV<UserCSV>(path.join(__dirname, 'data/users.csv'));
  
  for (const userData of usersData) {
    await prisma.user.create({
      data: {
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        name: userData.name,
        role: userData.role,
      },
    });
  }
  console.log(`✅ ${usersData.length} usuarios creados`);

  // 2. Crear torneos
  console.log('🏆 Creando torneos...');
  const tournamentsData = await readCSV<TournamentCSV>(path.join(__dirname, 'data/tournaments.csv'));
  
  for (const tournamentData of tournamentsData) {
    const organizer = await prisma.user.findUnique({
      where: { email: tournamentData.organizerEmail },
    });

    if (organizer) {
      await prisma.tournament.create({
        data: {
          name: tournamentData.name,
          description: tournamentData.description,
          startDate: new Date(tournamentData.startDate),
          endDate: new Date(tournamentData.endDate),
          maxTeams: parseInt(tournamentData.maxTeams),
          organizerId: organizer.id,
        },
      });
    }
  }
  console.log(`✅ ${tournamentsData.length} torneos creados`);

  // 3. Crear equipos
  console.log('⚽ Creando equipos...');
  const teamsData = await readCSV<TeamCSV>(path.join(__dirname, 'data/teams.csv'));
  
  for (const teamData of teamsData) {
    const tournament = await prisma.tournament.findFirst({
      where: { name: teamData.tournamentName },
    });

    if (tournament) {
      await prisma.team.create({
        data: {
          name: teamData.name,
          description: teamData.description,
          tournamentId: tournament.id,
        },
      });
    }
  }
  console.log(`✅ ${teamsData.length} equipos creados`);

  // 4. Crear jugadores
  console.log('🏃 Creando jugadores...');
  const playersData = await readCSV<PlayerCSV>(path.join(__dirname, 'data/players.csv'));
  
  for (const playerData of playersData) {
    const team = await prisma.team.findFirst({
      where: { name: playerData.teamName },
    });

    if (team) {
      await prisma.player.create({
        data: {
          name: playerData.name,
          position: playerData.position,
          number: parseInt(playerData.number),
          teamId: team.id,
        },
      });
    }
  }
  console.log(`✅ ${playersData.length} jugadores creados`);

  // 5. Crear partidos
  console.log('⚽ Creando partidos...');
  const matchesData = await readCSV<MatchCSV>(path.join(__dirname, 'data/matches.csv'));
  
  for (const matchData of matchesData) {
    const homeTeam = await prisma.team.findFirst({
      where: { name: matchData.homeTeamName },
    });

    const awayTeam = await prisma.team.findFirst({
      where: { name: matchData.awayTeamName },
    });

    const tournament = await prisma.tournament.findFirst({
      where: { name: matchData.tournamentName },
    });

    if (homeTeam && awayTeam && tournament) {
      await prisma.match.create({
        data: {
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          tournamentId: tournament.id,
          matchDate: new Date(matchData.matchDate),
          homeScore: matchData.homeScore ? parseInt(matchData.homeScore) : null,
          awayScore: matchData.awayScore ? parseInt(matchData.awayScore) : null,
          status: matchData.status as any,
        },
      });
    }
  }
  console.log(`✅ ${matchesData.length} partidos creados`);

  console.log('🎉 Seeding completado exitosamente!');
}



main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });