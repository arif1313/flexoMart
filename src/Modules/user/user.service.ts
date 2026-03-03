import { UserModel } from './user.model';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../app/config';


const createUserInDB = async (userData: TUser) => {
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  const result = await UserModel.create(userData);
  return result;
};

const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).select('+password');
  
  if (!user) {
    throw new Error('User not found');
  }

  if (!user.isActive) {
    throw new Error('User account is deactivated');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '7d',
  });

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const getUserProfileFromDB = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUserProfileInDB = async (userId: string, updateData: Partial<TUser>) => {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    updateData,
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const getAllUsersFromDB = async () => {
  const users = await UserModel.find({ role: 'user' });
  return users;
};

export const UserService = {
  createUserInDB,
  loginUser,
  getUserProfileFromDB,
  updateUserProfileInDB,
  getAllUsersFromDB,
};