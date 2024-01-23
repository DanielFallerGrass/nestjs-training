import { CreateUserDTO } from './create-user.dto';

export class UpdatePutUserDTO extends CreateUserDTO {
  // com o extends acima ele herda todas as propriedades do CreateUserDto e não precisa repetir as validações
}
