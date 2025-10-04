import { Controller, Get, Post, UseGuards, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { QueryTournamentDto } from './dto/query-tournament.dto';
import { TournamentsService } from './tournaments.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'generated/prisma';

@Controller('tournaments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentsController {
    constructor(private readonly tournamentsService: TournamentsService) {}

    @Roles(Role.ADMIN)
    @Post()
    create(@Body() createTournamentDto: CreateTournamentDto, @Request() req) {
        return this.tournamentsService.create(createTournamentDto, req.user.id);
    }

    @Get()
    findAll(@Query() query: QueryTournamentDto) {
        return this.tournamentsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tournamentsService.findOne(id);
    }

    @Roles(Role.ADMIN)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTournamentDto: UpdateTournamentDto) {
        return this.tournamentsService.update(id, updateTournamentDto);
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tournamentsService.remove(id);
    }
}
