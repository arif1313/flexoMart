import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';

import config from '../config';
import { UserModel } from '../../Modules/user/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { userId: string; email: string; role: string };
    }
  }
}

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('You are not authorized');
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload & {
      userId: string;
      email: string;
      role: string;
    };

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User account is deactivated');
    }

    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      throw new Error('You do not have permission to access this resource');
    }

    req.user = decoded;
    next();
  });
};

export default auth;