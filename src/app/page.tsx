import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import CreatePost from "@/components/CreatePost";
import FollowReccomended from "@/components/FollowReccomended";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";


export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  console.log({posts});
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}
        <div className="space-y-6"></div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} dbUserId={dbUserId} />
        ))}
      </div>
      <div className=" lg:col-span-4 sticky top-20">
        <FollowReccomended/>
      </div>
    </div>
  );
}
