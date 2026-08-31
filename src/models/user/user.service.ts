import User, { UserCreationAttributes } from './user.model';
import bcrypt from 'bcrypt';

export class UserService {
  async create(data: UserCreationAttributes): Promise<User> {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashed });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }
}

export default new UserService();