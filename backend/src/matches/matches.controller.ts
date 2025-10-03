import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { QueryMatchDto } from "./dto/query-match.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";


@Controller('matches')
@UseGuards(JwtAuthGuard)
export class MatchesController {
    constructor(private readonly matchesService: MatchesService) {}

    @Get()
    findAll(@Query() query: QueryMatchDto) {
        return this.matchesService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.matchesService.findOne(id);
    }

    @Post()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    create(@Body() createMatchDto: CreateMatchDto) {
        return this.matchesService.create(createMatchDto);
    }

    @Patch(':id')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
        return this.matchesService.update(id, updateMatchDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    remove(@Param('id') id: string) {
        return this.matchesService.remove(id);
    }
}