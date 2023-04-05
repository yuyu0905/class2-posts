const errorHandle = require('../utils/errorHandle');
const successHandle = require('../utils/successHandle');
const Post = require('../models/posts');

const posts = {
    async getPosts(req, res) {
        const post = await Post.find();
        successHandle(res, post);
    },
    async createPosts({req, res, body}) {
        try {
            const data = JSON.parse(body);
            if(data.content) {
                const newPost = await Post.create(
                    {
                        name: data.name,
                        content: data.content,
                    }
                );
                successHandle(res, newPost);
            } else {
                errorHandle(res);
            }
            
        } catch (err) {
            errorHandle(res, err);
        }
    },
    async deleteAllPosts(req, res) {
        const post = await Post.deleteMany({});
        successHandle(res, post);
    },
    async deletePosts(req, res) {
        try {
            const { url } = req;
            const id = url.split('/').pop();
            const post = await Post.findByIdAndDelete(id);
            if(post) {
                successHandle(res, post);
            } else {
                errorHandle(res);
            }
        } catch (err) {
            errorHandle(res, err);
        }
    },
    async updatePosts({req, res, body}) {
        try {
            const { url } = req;
            const id = url.split('/').pop();
            const data = JSON.parse(body);
            const updatePost = await Post.findByIdAndUpdate(id, {
                name: data.name,
                content: data.content,
            }, { new: true });
            if(updatePost) {
                successHandle(res, updatePost);
            } else {
                errorHandle(res);
            }
        } catch (err) {
            errorHandle(res, err);
        }
    },
}

module.exports = posts;
