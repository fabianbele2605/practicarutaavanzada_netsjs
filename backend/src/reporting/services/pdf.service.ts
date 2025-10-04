import { Injectable } from "@nestjs/common";
import * as puppeteer from "puppeteer";

@Injectable()
export class PdfService {
    constructor () {}
    async generatePDF(htmlContent: string, filename: string): Promise<any> {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(htmlContent);
            const pdf = await page.pdf({ format: 'A4' });
            await browser.close();
            return pdf;
        }

    async generateTournamentReport(TournamentStats: any): Promise<Buffer> {
        const htmlContent = `
            <h1>Tournament Report</h1>
            <p>Tournament Name: ${TournamentStats.tournamentName}</p>
            <p>Total Teams: ${TournamentStats.totalTeams}</p>
            <p>Total Matches: ${TournamentStats.totalMatches}</p>
        `;

        return this.generatePDF(htmlContent, 'tournament_report.pdf');
    };
}