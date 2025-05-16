import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';
import { Note as NoteClient } from '@prisma/client';
import { User } from 'src/users/entities/user.entity';

export class Note extends CreateNoteDto implements NoteClient {
  constructor({ author, ...data }: Note) {
    super();
    Object.assign(this, data);

    if (author) {
      this.author = new User(author);
    }
  }
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, type: User })
  author?: User | null;
}
