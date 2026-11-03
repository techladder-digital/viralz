import { IsString, Matches, MaxLength } from 'class-validator';

export class CreateMediaFolderDto {
  @IsString()
  @Matches(/\S/)
  @MaxLength(50)
  name: string;
}
