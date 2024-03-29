import {
  IsDateString,
  IsEmail, IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword
} from "class-validator";
import { Role } from "../../enums/role.enum";

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword({
    minLength: 6, // Mínimo de 6 caracteres todavia se não for passado o restante das opções o default do class-validator é 1 maiuscula, 1 minuscula, 1 numero e 1 caracter especial
  })
  readonly password: string;

  @IsOptional()
  @IsDateString()
  readonly birth_at: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role: number;
}
