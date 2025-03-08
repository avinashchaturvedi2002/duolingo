import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPosts, updatePost } from '../services/api';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token'); // Get the token from localStorage

    useEffect(() => {
        // Fetch the post data to pre-fill the form
        const fetchPost = async () => {
            try {
                const response = await getPosts();
                const post = response.data.find((p) => p.id === parseInt(id));
                if (post) {
                    setTitle(post.title);
                    setContent(post.content);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost(id, title, content, token);
            navigate('/my-posts'); // Redirect to the "My Posts" page after updating
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default EditPost;