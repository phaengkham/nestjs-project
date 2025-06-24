import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const result = await bcrypt.hash(password, saltRounds);
  return result;
}
