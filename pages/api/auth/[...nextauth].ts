import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube"
        }
      }
    }),
    SpotifyProvider({
      clientId: process.env.NEXT_CLIENT_ID!,
      clientSecret: process.env.NEXT_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, _, account }) {
      if (account) {
        token.id = account!.id;
        token.provider = account!.provider;
        token.access_token = account!.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // session.token = token;
      session.user = token;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt"
  }
  // ...add more providers here
};
export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
