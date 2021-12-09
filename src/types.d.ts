import { PrismaClient, User } from '.prisma/client';

type RequiredProperty<T> = { [P in keyof T]: NonNullable<T[P]> };

export type Context = {
  loggedInUser: User | null;
  client: PrismaClient;
};
export type NonNullContext = RequiredProperty<Context>;

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type ProtectedResolver = (
  root: any,
  args: any,
  context: NonNullContext,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
