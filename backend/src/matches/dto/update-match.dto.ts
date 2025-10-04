import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { CreateMatchDto } from './create-match.dto';
import { MatchStatus } from '../../../generated/prisma';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  homeScore?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  awayScore?: number;
}