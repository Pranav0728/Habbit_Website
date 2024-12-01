import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RedirectWithToken = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.token) {
      const vscodeRedirectUrl = `http://localhost:3000/usertoken?token=${session.user.token}`;
      window.location.href = vscodeRedirectUrl;
    }
  }, [session]);

  return <div>Redirecting...</div>;
};

export default RedirectWithToken;
