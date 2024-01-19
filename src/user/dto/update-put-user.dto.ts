import { CreateUserDto } from './create-user.dto';

export class UpdatePutUserDto extends CreateUserDto {
  // com o extends acima ele herda todas as propriedades do CreateUserDto e não precisa repetir as validações
}
