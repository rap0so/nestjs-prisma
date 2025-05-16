import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { Note as NoteClient } from '@prisma/client';

export class Note extends CreateNoteDto implements NoteClient {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
