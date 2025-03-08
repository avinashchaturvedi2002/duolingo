import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyPosts, deletePost } from '../services/api';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token'); // Get the token from localStorage

    useEffect(() => {
        // Fetch the logged-in user's posts
        const fetchMyPosts = async () => {
            try {
                const response = await getMyPosts(token);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching my posts:', error);
            }
        };

        fetchMyPosts();
    }, [token]);

    // Function to handle post deletion
    const handleDelete = async (postId) => {
        try {
            await deletePost(postId, token); // Call the deletePost API
            // Refresh the list of posts after deletion
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>My Posts</h1>
            <Link to="/create-post" className="btn btn-primary mb-3">
                Create Post
            </Link>
            <div className="list-group">
                {posts.map((post) => (
                    <div key={post.id} className="list-group-item">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>Created on {new Date(post.created_at).toLocaleString()}</small>
                        <div className="mt-2">
                            <Link to={`/edit-post/${post.id}`} className="btn btn-warning btn-sm me-2">
                                Edit
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(post.id)} // Call handleDelete
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;