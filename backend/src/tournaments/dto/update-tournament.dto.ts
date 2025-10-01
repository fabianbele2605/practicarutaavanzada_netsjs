import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { TournamentStatus } from "generated/prisma";

export class UpdateTournamentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsInt()
    @Min(2)
    maxTeams?: number;

    @IsOptional()
    @IsEnum(TournamentStatus)
    status?: TournamentStatus;
}