import { Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'node:console';

const MAX_DOCUMENTS = 100;
@Injectable()
export class NotesService extends PrismaService {
  constructor(private prisma: PrismaService) {
    super();
  }

  create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: createNoteDto,
    });
  }

  findAll() {
    return this.prisma.note.findMany({ take: MAX_DOCUMENTS });
  }

  findAllPublished() {
    return this.prisma.note.findMany({
      where: { published: true },
      take: MAX_DOCUMENTS,
      skip: 0,
    });
  }

  findOne(id: number) {
    log('????', id);
    return this.prisma.note.findUnique({ where: { id } });
  }

  findDrafts() {
    return this.prisma.note.findMany({
      where: {
        published: false,
      },
      take: MAX_DOCUMENTS,
      skip: 0,
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  remove(id: number) {
    /* 
     I usually prefer NOT to delete items like this, but instead set a "deleted: true" property 
     so I can retrieve in case something goes wrong
    */
    return this.note.delete({
      where: { id },
    });
  }
}
