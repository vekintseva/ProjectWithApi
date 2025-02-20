import Comments from "../components/Comments";
import PostDetails from "../components/PostDetail";

const PostPage = () => {
  return (
    <div>
      <PostDetails />
      <Comments postId={1} />
    </div>
  );
};

export default PostPage;