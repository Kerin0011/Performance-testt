import { Request, Response } from 'express';
import userService from './user.service';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, role } = req.body;
    try {
      const existing = await userService.findByEmail(email);
      if (existing) {
        res.status(409).json({ message: 'Email already in use' });
        return;
      }

      const userRole = role === 'ADMIN' ? 'ADMIN' : 'MANAGER';
      const user = await userService.create({ name, email, password, role: userRole });
      res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await userService.findByEmail(email);
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '8h' }
      );
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new UserController();