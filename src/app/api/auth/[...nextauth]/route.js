
import NextAuth from "next-auth";
import { authOptions } from "./option";  // Adjust path if necessary

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
