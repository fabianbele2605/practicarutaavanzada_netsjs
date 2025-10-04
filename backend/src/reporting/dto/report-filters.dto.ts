import { IsOptional, IsString, IsDateString, IsEnum, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel'
}

export class TournamentReportDto {
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(ReportFormat)
  format?: ReportFormat = ReportFormat.PDF;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeCharts?: boolean = false;
}

export class PlayerReportDto {
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsEnum(ReportFormat)
  format?: ReportFormat = ReportFormat.PDF;
}

export class MatchReportDto {
  @IsOptional()
  @IsString()
  tournamentId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsEnum(ReportFormat)
  format?: ReportFormat = ReportFormat.PDF;
}

export class GeneralMetricsDto {
  @IsOptional()
  @IsEnum(ReportFormat)
  format?: ReportFormat = ReportFormat.PDF;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  includeCharts?: boolean = true;
}