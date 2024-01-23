import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {
  // com o extends acima ele herda todas as propriedades do CreateUserDto e não precisa repetir as validações
}
