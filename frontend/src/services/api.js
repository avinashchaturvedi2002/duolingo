import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (username, password) => {
    return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username, password) => {
    return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const createPost = async (title, content, token) => {
    return axios.post(`${API_URL}/posts`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getPosts = async () => {
    return axios.get(`${API_URL}/posts`);
};

export const getMyPosts = async (token) => {
    return axios.get(`${API_URL}/posts/my-posts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updatePost = async (id, title, content, token) => {
    return axios.put(`${API_URL}/posts/${id}`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deletePost = async (id, token) => {
    return axios.delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};