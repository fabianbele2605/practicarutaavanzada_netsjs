import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreatePlayerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsInt()
    @IsOptional()
    number?: number;

    @IsString()
    @IsNotEmpty()
    teamId: string;
}