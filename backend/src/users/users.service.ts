import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcryptjs';
import { User } from "generated/prisma";


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });

        const { password, ...result } = user;
        return result;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });

        if (!user) return null;

        const { password, ...result } = user;
        return result;
    }
}