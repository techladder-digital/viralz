import { IsDefined, IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class ActivateCodeDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @Matches(/^\d{6}$/, { message: 'Enter the 6-digit code from your email' })
  code: string;

  @IsOptional()
  @IsString()
  datafast_visitor_id?: string;
}
