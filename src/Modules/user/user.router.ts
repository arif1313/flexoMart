import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth.middleware';


const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserController.loginUser
);

// router.get(
//   '/profile',
//   auth('user', 'admin'),
//   UserController.getUserProfile
// );

// router.patch(
//   '/profile',
//   auth('user', 'admin'),
//   validateRequest(UserValidation.updateUserValidationSchema),
//   UserController.updateUserProfile
// );

router.get(
  '/users',
  auth('admin'),
  UserController.getAllUsers
);

export const UserRoutes = router;