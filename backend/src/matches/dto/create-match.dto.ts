import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateMatchDto {
    @IsDateString()
    @IsNotEmpty()
    matchDate: string;

    @IsString()
    @IsNotEmpty()
    tournamentId: string;

    @IsString()
    @IsNotEmpty()
    homeTeamId: string;

    @IsString()
    @IsNotEmpty()
    awayTeamId: string;
}