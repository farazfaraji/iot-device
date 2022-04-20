import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

export async function hashPasswordHelper(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
