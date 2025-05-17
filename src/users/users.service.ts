import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

const roundsOfSalting = 10;
@Injectable()
export class UsersService extends PrismaService {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, roundsOfSalting);

    return this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
  }

  findAll() {
    // TODO:  this.prisma.user.findMany({ where: { active: true /** or disabled: false */ }});
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await hash(
        updateUserDto.password,
        roundsOfSalting,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.user.delete({ where: { id } });
  }
}
