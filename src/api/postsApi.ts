import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const fetchPostById = async (id: number) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const fetchCommentsByPostId = async (postId: number) => {
  const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};