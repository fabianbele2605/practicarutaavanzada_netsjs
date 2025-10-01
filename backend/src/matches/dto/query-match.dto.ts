import { IsOptional, IsDateString, IsString, IsEnum } from "class-validator";
import { MatchStatus } from "../../../generated/prisma";


export class QueryMatchDto {
    @IsOptional()
    @IsDateString()
    matchDate?: string;

    @IsOptional()
    @IsString()
    tournamentId?: string;
    
    @IsOptional()
    @IsString()
    homeTeamId?: string;

    @IsOptional()
    @IsString()
    awayTeamId?: string;

    @IsOptional()
    @IsEnum(MatchStatus)
    status?: MatchStatus;
}