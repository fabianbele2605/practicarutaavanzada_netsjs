import { Injectable } from "@nestjs/common";
import * as ExcelJS from "exceljs"; 


@Injectable()
export class ExcelService {
    constructor () {}

    async generateTournamentExcel(tournamentStats: any): Promise<any> {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tournament Report');

        worksheet.addRow(['Tournament Name', 'Total Teams', 'Total Matches']);

        worksheet.addRow([
            tournamentStats.tournamentName,
            tournamentStats.totalTeams,
            tournamentStats.totalMatches
        ]);

        return await workbook.xlsx.writeBuffer();
    }
}