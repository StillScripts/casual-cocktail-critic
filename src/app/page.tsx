import Link from "next/link";

import { RecipesTable } from "@/app/_components/recipes-table";

import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Casual <span className="text-[hsl(280,100%,70%)]">Cocktail</span>
          Critic
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-black">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Button asChild>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Sign out" : "Sign in"}
              </Link>
            </Button>
          </div>
        </div>

        <RecipesTable />
      </div>
    </main>
  );
}
