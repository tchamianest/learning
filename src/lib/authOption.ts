import { compare } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { usersdata } from './schema';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await db
          .select()
          .from(usersdata)
          .where(eq(usersdata.email, credentials ? credentials.email : ''));

        const passwordCorrect = await compare(
          credentials?.password || '',
          user[0].password
        );

        if (passwordCorrect) {
          return {
            id: user[0].id,
            email: user[0].email,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
