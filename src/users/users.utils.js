import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  if (!token) return null;
  try {
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = client.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
};

export const protectResolver =
  (originResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action.',
      };
    }
    return originResolver(root, args, context, info);
  };
