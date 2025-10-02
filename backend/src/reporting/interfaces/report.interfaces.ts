export interface TournamentStats {
  tournamentId: string;
  tournamentName: string;
  totalTeams: number;
  totalMatches: number;
  completedMatches: number;
  pendingMatches: number;
  totalGoals: number;
  averageGoalsPerMatch: number;
  startDate: Date;
  endDate: Date;
  status: string;
}

export interface PlayerStats {
  playerId: string;
  playerName: string;
  teamName: string;
  tournamentName: string;
  position: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export interface GeneralMetrics {
  totalTournaments: number;
  activeTournaments: number;
  completedTournaments: number;
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
  totalTeams: number;
  totalPlayers: number;
  totalMatches: number;
  completedMatches: number;
}

export interface MatchReport {
  matchId: string;
  tournamentName: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  matchDate: Date;
  status: string;
  duration?: number;
}

export interface ExportOptions {
  format: 'pdf' | 'excel';
  includeCharts?: boolean;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
}