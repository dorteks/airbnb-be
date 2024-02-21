import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as APP from 'src/core/constants/app';
import { capitalize } from 'src/core/utils/strings';

export class TLoginBody {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(APP.PASSWORD_MIN_LENGTH)
  @MaxLength(APP.PASSWORD_MAX_LENGTH)
  password: string;
}

export class TVerifyEmailBody {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class TCreateAccountBody {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!-)(?!.*-$)[A-Za-z-]+$/)
  @Transform(({ value }) => capitalize(value))
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!-)(?!.*-$)[A-Za-z-]+$/)
  @Transform(({ value }) => capitalize(value))
  firstName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(APP.PASSWORD_MIN_LENGTH)
  @MaxLength(APP.PASSWORD_MAX_LENGTH)
  password: string;

  @IsString()
  role: string;
}
