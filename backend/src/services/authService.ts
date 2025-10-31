import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { User, JWTPayload } from '../types';
import { AppError } from '../middleware/errorHandler';

export class AuthService {
  async register(email: string, password: string, role: string = 'viewer'): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, $3)
       RETURNING id, email, role, created_at as "createdAt"`,
      [email, hashedPassword, role]
    );

    return result.rows[0];
  }

  async login(email: string, password: string): Promise<string> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const secret = process.env.JWT_SECRET || 'secret';
    const expiresIn = process.env.JWT_EXPIRE || '24h';

    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    try {
      const secret = process.env.JWT_SECRET || 'secret';
      return jwt.verify(token, secret) as JWTPayload;
    } catch (error) {
      throw new AppError('Invalid token', 401);
    }
  }
}

export default new AuthService();