import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: { label: "Token", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          const response = await fetch(
            `https://trick-go-asp-southeast.trycloudflare.com/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                otp: credentials.otp,
                token: credentials.token,
              }),
            }
          );
          if (response.ok) {
            const loginResult = await response.json();
            return loginResult;
          } else {
            const errorData = await response.json();
            console.error("Server responded with an error:", errorData);
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Fetch error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.type;
        token.username = user.username;
        token.FullName = user.FullName;
        token.token = user.access;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.FullName = token.FullName;
      session.user.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    verifyRequest: "/auth/VerifiedEmail",
    newUser: "/auth/VerifiedEmail",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
