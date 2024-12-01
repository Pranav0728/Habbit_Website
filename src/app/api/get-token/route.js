import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ error: "Session nahi mila" }),
      { status: 401 }
    );
  }

  return new NextResponse(
    JSON.stringify({ accessToken: session.user.accessToken }),
    { status: 200 }
  );
};
