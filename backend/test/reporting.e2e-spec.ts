import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import request  from "supertest";
import { AppModule } from "../src/app.module";


describe('Reporting (e2e)', () => {
    let app: INestApplication;
    let jwtToken: string;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

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