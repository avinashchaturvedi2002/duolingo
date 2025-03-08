const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/my-posts', auth, async (req, res) => {
    try {
        const posts = await Post.getByUser(req.user.id);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const postId = await Post.create(title, content, req.user.id);
        res.status(201).json({ message: 'Post created', postId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const changes = await Post.update(req.params.id, title, content);
        if (changes > 0) res.json({ message: 'Post updated' });
        else res.status(404).json({ error: 'Post not found' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const changes = await Post.delete(req.params.id);
        if (changes > 0) res.json({ message: 'Post deleted' });
        else res.status(404).json({ error: 'Post not found' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;