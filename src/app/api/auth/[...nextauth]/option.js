import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/utils/db";
import Activity from "@/models/Activity";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider && profile) {
        try {
          await dbConnect();

          // Check if the user already exists in the database
          let existingUser = await Activity.findOne({ email: profile.email });

          if (!existingUser) {
            // Create a new user if they don't exist
            const newUser = new Activity({
              userId: account.providerAccountId,
              email: profile.email,
              name: profile.name || profile.login || "Unknown User",
              image: profile.picture || profile.avatar_url || "",
              track: {}, // Initialize with an empty object or default structure
            });
            await newUser.save();
            existingUser = newUser;
          }

          // Attach user ID to the token
          token.id = existingUser._id.toString();
          token.email = existingUser.email;
        } catch (error) {
          console.error("Error in jwt callback:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = jwt.sign(
          { id: token.id, email: token.email },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: "30d" }
        ); 
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url; // Allow only same-origin redirects
      }
      return baseUrl; // Fallback to the base URL
    },
  },
};
