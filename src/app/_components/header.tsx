import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";

const Header = async () => {
  const session = await getServerAuthSession();
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <Link href="/" className="font-extrabold uppercase">
        C<span className="text-primary">C</span>C
      </Link>
      <div className="flex items-center justify-end space-x-2 lg:space-x-3">
        <Button variant="link" asChild>
          <Link href="/recipes">Cocktails</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? "Sign out" : "Sign in"}
            <span aria-hidden="true">&nbsp;&rarr;</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
