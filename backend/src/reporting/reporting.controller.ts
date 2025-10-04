import { Controller, Get, Query, Res, UseGuards  } from "@nestjs/common";
import { Response } from "express";
import { ReportingService } from "./services/reporting.service";
import { PdfService } from "./services/pdf.service";
import { ExcelService } from "./services/excel.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";


@Controller('reporting')
export class ReportingController {
    constructor (
        private reportingService: ReportingService,
        private pdfService: PdfService,
        private excelService: ExcelService
    ) {}

    @Get('tournament-stats')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async getTournamentStats(@Query('format') format: string = 'pdf') {
        const stats = await this.reportingService.getTournamentStats();

        if (format === 'excel') {
            return await this.excelService.generateTournamentExcel(stats[0]);
        }

        return await this.pdfService.generateTournamentReport(stats[0]);
    }

    @Get('players')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
async getPlayerReport(
    @Query('format') format: string = 'pdf',
    @Query('tournamentId') tournamentId?: string,
    @Query('teamId') teamId?: string,
) {
    const stats = await this.reportingService.getPlayerStats(tournamentId, teamId);

    if (format === 'excel') {
        return stats;
    }
    
    return stats;
}

@Get('general-metrics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
async getGeneralMetrics(@Query('format') format: string = 'pdf') {
    const metrics = await this.reportingService.getGeneralMetrics();

    if (format === 'excel') {
        return metrics;
    }

    return metrics;
}
}

