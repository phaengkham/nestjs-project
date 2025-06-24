import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'ຮູບແບບອີເມລບໍ່ຖືກຕ້ອງ' })
  email: string;

  @IsNotEmpty({ message: 'ລະຫັດຜ່ານຫ້າມມີຄ່າຫວ່າງ' })
  @MinLength(6, { message: 'ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ' })
  password: string;

  @IsNotEmpty({ message: 'ຊື່ຜູ້ໃຊ້ຫ້າມມີຄ່າຫວ່າງ' })
  username: string;
}
