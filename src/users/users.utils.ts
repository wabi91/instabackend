import jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver, ProtectedResolver, NonNullContext } from '../types';

export const getUser = async (token: string) => {
  if (!token) return null;
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY as string) as {
      id: number;
    };
    const user = client.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
};

export const protectedResolver =
  (originResolver: ProtectedResolver): Resolver =>
  (root, args, context, info) => {
    const isQuery = info.operation.operation === 'query';
    if (!context.loggedInUser) {
      return isQuery
        ? null
        : {
            ok: false,
            error: 'Please log in to perform this action.',
          };
    }

    return originResolver(root, args, context as NonNullContext, info);
  };
