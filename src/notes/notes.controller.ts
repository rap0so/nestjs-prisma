import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Note } from './entities/note.entity';

@Controller('notes')
@ApiTags('Notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({ type: Note })
  async create(@Body() createNoteDto: CreateNoteDto) {
    const result = await this.notesService.create(createNoteDto);
    return new Note(result);
  }

  @Get()
  @ApiOkResponse({ type: Note, isArray: true })
  async findAll() {
    const notes = await this.notesService.findAll();
    return notes.map((note) => new Note(note));
  }

  @Get('published')
  @ApiOkResponse({ type: Note, isArray: true })
  async findPublished() {
    const notes = await this.notesService.findAllPublished();
    return notes.map((note) => new Note(note));
  }

  @Get('draft')
  @ApiOkResponse({ type: Note, isArray: true })
  async findDrafts() {
    const notes = await this.notesService.findDrafts();
    return notes.map((note) => new Note(note));
  }

  @Get(':id')
  @ApiOkResponse({ type: Note })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.notesService.findOne(id);
    return new Note(result);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Note })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const result = await this.notesService.update(id, updateNoteDto);
    return new Note(result);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Note })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.notesService.remove(id);
    return new Note(result);
  }
}
