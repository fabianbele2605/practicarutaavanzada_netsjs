import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { TournamentStatus } from "generated/prisma";


export class CreateTournamentDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsInt()
    @Min(2)
    maxTeams: number;

    @IsOptional()
    @IsEnum(TournamentStatus)
    status?: TournamentStatus;
}