import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  id: number;
  name: string;
  body: string;
}

const Comments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      setComments(response.data);
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;