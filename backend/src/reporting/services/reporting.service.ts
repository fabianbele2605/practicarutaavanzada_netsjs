import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TournamentStats, PlayerStats, GeneralMetrics, MatchReport } from '../interfaces/report.interfaces';

@Injectable()
export class ReportingService {
  constructor(private prisma: PrismaService) {}

  async getTournamentStats(tournamentId?: string): Promise<TournamentStats[]> {
    const tournaments = await this.prisma.tournament.findMany({
      where: tournamentId ? { id: tournamentId } : {},
      include: {
        teams: true,
        matches: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        }
      }
    });

    return tournaments.map(tournament => {
      const completedMatches = tournament.matches.filter(m => m.status === 'FINISHED');
      const totalGoals = completedMatches.reduce((sum, match) => 
        sum + (match.homeScore || 0) + (match.awayScore || 0), 0
      );

      return {
        tournamentId: tournament.id,
        tournamentName: tournament.name,
        totalTeams: tournament.teams.length,
        totalMatches: tournament.matches.length,
        completedMatches: completedMatches.length,
        pendingMatches: tournament.matches.length - completedMatches.length,
        totalGoals,
        averageGoalsPerMatch: completedMatches.length > 0 ? totalGoals / completedMatches.length : 0,
        startDate: tournament.startDate,
        endDate: tournament.endDate,
        status: tournament.status
      };
    });
  }

  async getPlayerStats(tournamentId?: string, teamId?: string): Promise<PlayerStats[]> {
    const players = await this.prisma.player.findMany({
      where: {
        ...(teamId && { teamId }),
        ...(tournamentId && { team: { tournamentId } })
      },
      include: {
        team: {
          include: {
            tournament: true
          }
        }
      }
    });

    return players.map(player => ({
      playerId: player.id,
      playerName: player.name,
      teamName: player.team.name,
      tournamentName: player.team.tournament.name,
      position: player.position || 'N/A',
      matchesPlayed: 0, // TODO: Calcular partidos jugados
      goals: 0, // TODO: Implementar sistema de goles
      assists: 0, // TODO: Implementar sistema de asistencias
      yellowCards: 0, // TODO: Implementar sistema de tarjetas
      redCards: 0 // TODO: Implementar sistema de tarjetas
    }));
  }

  async getGeneralMetrics(): Promise<GeneralMetrics> {
    const [
      totalTournaments,
      activeTournaments,
      completedTournaments,
      totalUsers,
      adminUsers,
      totalTeams,
      totalPlayers,
      totalMatches,
      completedMatches
    ] = await Promise.all([
      this.prisma.tournament.count(),
      this.prisma.tournament.count({ where: { status: 'ACTIVE' } }),
      this.prisma.tournament.count({ where: { status: 'FINISHED' } }),
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.team.count(),
      this.prisma.player.count(),
      this.prisma.match.count(),
      this.prisma.match.count({ where: { status: 'FINISHED' } })
    ]);

    return {
      totalTournaments,
      activeTournaments,
      completedTournaments,
      totalUsers,
      adminUsers,
      regularUsers: totalUsers - adminUsers,
      totalTeams,
      totalPlayers,
      totalMatches,
      completedMatches
    };
  }

  async getMatchReports(tournamentId?: string, startDate?: Date, endDate?: Date): Promise<MatchReport[]> {
    const matches = await this.prisma.match.findMany({
      where: {
        ...(tournamentId && { tournamentId }),
        ...(startDate && endDate && {
          matchDate: {
            gte: startDate,
            lte: endDate
          }
        })
      },
      include: {
        tournament: true,
        homeTeam: true,
        awayTeam: true
      },
      orderBy: { matchDate: 'desc' }
    });

    return matches.map(match => ({
      matchId: match.id,
      tournamentName: match.tournament.name,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeScore: match.homeScore || 0,
      awayScore: match.awayScore || 0,
      matchDate: match.matchDate,
      status: match.status,
      duration: 90 // Duración estándar por ahora
    }));
  }
}