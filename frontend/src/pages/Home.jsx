import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch all posts from the backend
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Home</h1>
            <Link to="/create-post" className="btn btn-primary mb-3">
                Create Post
            </Link>
            <div className="list-group">
                {posts.map((post) => (
                    <div key={post.id} className="list-group-item">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>By User #{post.author_id} on {new Date(post.created_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;