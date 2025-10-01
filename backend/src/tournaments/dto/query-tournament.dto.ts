import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min, Max } from "class-validator";
import { TournamentStatus } from "generated/prisma";


export class QueryTournamentDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(TournamentStatus)
    status?: TournamentStatus;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

}