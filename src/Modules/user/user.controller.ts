import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';


const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUserInDB(req.body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await UserService.loginUser(email, password);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

// const getUserProfile = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.userId;
//   const result = await UserService.getUserProfileFromDB(userId);
  
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User profile fetched successfully',
//     data: result,
//   });
// });

// const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.userId;
//   const result = await UserService.updateUserProfileInDB(userId, req.body);
  
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User profile updated successfully',
//     data: result,
//   });
// });

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  getAllUsers,
};