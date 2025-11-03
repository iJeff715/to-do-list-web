import axios from "axios";

// Create an Axios instance with the base URL of JSONPlaceholder
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// Define CRUD operations for posts
export const getPosts = () => api.get("/posts");
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
