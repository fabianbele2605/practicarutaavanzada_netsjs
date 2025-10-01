import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator"

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}