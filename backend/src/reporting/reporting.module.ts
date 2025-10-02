import { Module } from "@nestjs/common";
import { ReportingService } from "./services/reporting.service";
import { PdfService } from "./services/pdf.service";
import { ExcelService } from "./services/excel.service";
import { ReportingController } from "./reporting.controller";
import { PrismaService } from "../prisma/prisma.service";


@Module({
    imports: [],
    controllers: [ReportingController],
    providers: [ReportingService, PdfService, ExcelService, PrismaService],
    exports: [ ReportingService, PdfService, ExcelService]
})

export class ReportingModule {}