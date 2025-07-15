export class CreateUserDto {
  nombre: string;
  correo: string;
  celular: string;
  username: string;
  password: string;
  role?: 'admin' | 'user';
}
