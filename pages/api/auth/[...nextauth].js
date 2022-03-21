import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const { log } = console;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    async encode({ token: { sub, name, email, ...token }, secret }) {
      const signOptions = { algorithm: "HS256", expiresIn: "30 days" };
      return jwt.sign({ sub, name, email }, secret, signOptions);
    },
    async decode({ token, secret }) {
      return jwt.verify(token, secret, { algorithms: ["HS256"] });
    },
  },
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user }) {
      if (!token || !user) {
        return token;
      }
      return { ...token, ...user };
    },
  },
});
