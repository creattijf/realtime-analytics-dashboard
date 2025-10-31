import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth'; // ← ДОБАВЬТЕ ЭТУ СТРОКУ
import authService from '../services/authService';
import logger from '../config/logger';
import { AppError } from '../middleware/errorHandler';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        throw new AppError('Email and password are required', 400);
      }

      const user = await authService.register(email, password, role);

      res.status(201).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (error) {
      logger.error('Error in register:', error);
      
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Registration failed',
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new AppError('Email and password are required', 400);
      }

      const token = await authService.login(email, password);

      res.json({
        status: 'success',
        data: { token },
      });
    } catch (error) {
      logger.error('Error in login:', error);
      
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Login failed',
      });
    }
  }

  async me(req: AuthRequest, res: Response): Promise<void> {
    res.json({
      status: 'success',
      data: { user: req.user },
    });
  }
}

export default new AuthController();