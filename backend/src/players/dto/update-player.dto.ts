import { IsOptional, IsString, IsInt } from "class-validator";


export class UpdatePlayerDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsInt()
    @IsOptional()
    number?: number;

    @IsString()
    @IsOptional()
    teamId?: string;
}