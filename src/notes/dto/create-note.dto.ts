import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateNoteDto {
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published: boolean = false;

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null;
}
