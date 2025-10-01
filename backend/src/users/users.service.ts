import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";
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

    async findAll(query: QueryUserDto) {
        const { search, role, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' }},
                { email: { contains: search, mode: 'insensitive'}}
            ]
        }

        if (role) {
            where.role = role;
        }

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            }),
            this.prisma.user.count({ where })
        ]);

        return {
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { password, ...rest } = updateUserDto;

        const data: any = { ...rest };

        if(password) {
            data.password = await bcrypt.hash(password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async remove(id: string) {
        return this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });
    }
}