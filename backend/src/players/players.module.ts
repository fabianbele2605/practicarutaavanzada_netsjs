import { PrismaService } from "src/prisma/prisma.service";
import { PlayersController } from "./players.controller";
import { PlayersService } from "./players.service";
import { Module } from "@nestjs/common";


@Module({
    controllers: [PlayersController],
    providers: [PlayersService, PrismaService],
    exports: [PlayersService]
})

export class PlayersModule {}