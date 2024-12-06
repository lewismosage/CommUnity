import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostService } from '../../services/postService';
import { Post } from '../../types';

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    return await PostService.getPosts();
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (content: string) => {
    return await PostService.createPost({ content });
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId: string) => {
    return await PostService.likePost(postId);
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
  },
});

export default postSlice.reducer; 