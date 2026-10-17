import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  },
  register: async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    res.json(user);
  },
  refreshToken: async (req: Request, res: Response) => {
    const token = await authService.refresh(req.body.refreshToken);
    res.json({ token });
  },
};
