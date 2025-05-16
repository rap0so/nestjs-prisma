import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService extends PrismaService {
  constructor(private prisma: PrismaService) {
    super();
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    // TODO:  this.prisma.user.findMany({ where: { active: true /** or disabled: false */ }});
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.user.delete({ where: { id } });
  }
}
