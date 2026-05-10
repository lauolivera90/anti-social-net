import { PostForm } from "@/features/CreatePost/ui";
import {Feed} from "@/shared/ui";

function Home() {
  return (
    <>
      <PostForm />
      <Feed />
    </>
  );
}

export default Home;
