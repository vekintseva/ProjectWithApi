import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const post = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === Number(id))
  );

  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;