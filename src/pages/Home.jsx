import { PostForm } from "@/features/CreatePost/ui";
import {Feed} from "@/features/Home/ui";

function Home() {
  return (
    <>
      <PostForm />
      <Feed />
    </>
  );
}

export default Home;
