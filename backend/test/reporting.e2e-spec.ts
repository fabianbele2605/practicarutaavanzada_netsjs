import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import request  from "supertest";
import { AppModule } from "../src/app.module";
import { PdfService } from "../src/reporting/services/pdf.service";


describe('Reporting (e2e)', () => {
    let app: INestApplication;
    let jwtToken: string;

    beforeAll(async () => {
        const mockPdfService = {
            generateTournamentReport: jest.fn().mockResolvedValue(Buffer.from('mock pdf')),
        };

        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(PdfService)
        .useValue(mockPdfService)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'fabian@test.com',
                password: 'fabian123',
            });

        jwtToken = loginResponse.body.access_token;
    });

    afterAll(async () => {
        await app.close();
    });

    it('/reporting/tournament-stats (GET)', async () => {
        return request(app.getHttpServer())
            .get('/reporting/tournament-stats')
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);
    })
})