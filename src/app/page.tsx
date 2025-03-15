import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost";


export default async function Home() {
  const user = await currentUser();
  return (
    <div className="gird grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
      </div>
      <div className="hidden lg:col-span-4 sticky top-20">
        WhoToFollow
      </div>
    </div>
  );
}
