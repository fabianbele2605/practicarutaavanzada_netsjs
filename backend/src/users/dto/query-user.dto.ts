import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, IsEnum, Min, Max } from "class-validator";


enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class QueryUserDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

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