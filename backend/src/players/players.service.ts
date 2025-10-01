import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { QueryPlayerDto } from "./dto/query-player.dto";


@Injectable()
export class PlayersService {
    constructor(private prisma: PrismaService) {}

    async create(createPlayerDto: CreatePlayerDto) {
        return this.prisma.player.create({ data: createPlayerDto })
    }

    async findAll(queryDto: QueryPlayerDto) {
        const { search, position, teamId, page = 1, limit = 10} = queryDto;

        const where: any = {};

        if (search) {
            where.name = { contains: search, mode: 'insensitive'};
        }

        if (position) {
            where.position = position;
        }

        if (teamId) {
            where.teamId = teamId;
        }

        const skip = (page - 1) * limit;

        const [players, total] = await Promise.all([
            this.prisma.player.findMany({
                where,
                skip,
                take: limit,
                include: { team: true }
            }),
            this.prisma.player.count({ where })
        ]);

        return {
            data: players,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    }

    async findOne(id: string) {
        return this.prisma.player.findUnique({ where: { id } })
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        return this.prisma.player.update({ where: { id }, data: updatePlayerDto })
    }

    async remove(id: string) {
        return this.prisma.player.delete({ where: { id } })
    }

}
    