import PostList from '../components/PostList';
import AddPostForm from '../components/AddPostForm';

const HomePage = () => {
  return (
    <div className="content-box">
      <h1>Работа с постами</h1>
      <AddPostForm />
      <PostList />
    </div>
  );
};

export default HomePage;