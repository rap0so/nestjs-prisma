import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';

export class Note extends CreateNoteDto {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
