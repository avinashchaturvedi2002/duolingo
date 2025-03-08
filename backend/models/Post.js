const db = require('../db/database');

class Post {
    static getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM posts', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static getByUser(userId) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM posts WHERE author_id = ?', [userId], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static create(title, content, authorId) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
                [title, content, authorId],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID);
                }
            );
        });
    }

    static update(id, title, content) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE posts SET title = ?, content = ? WHERE id = ?',
                [title, content, id],
                function (err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                }
            );
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
                if (err) reject(err);
                else resolve(this.changes);
            });
        });
    }
}

module.exports = Post;