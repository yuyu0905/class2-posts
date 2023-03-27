const http = require('http');
const dotenv = require('dotenv');
const connectDB = require('./utils/mongooseUtils');
const errorHandle = require('./utils/errorHandle');
const successHandle = require('./utils/successHandle');
const Post = require('./models/posts');

dotenv.config({path: './config.env'});
connectDB();

const requestListener = async(req, res)=>{
    let body = "";
    req.on('data', chunk => {
        body += chunk
    });

    const { url, method } = req;

    if(url === '/posts' && method === 'GET') {
        const post = await Post.find();
        successHandle(res, post);
    } else if(url === '/posts' && method === 'POST') {
        req.on('end', async () => {
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
        });
    } else if(url === '/posts' && method === 'DELETE') {
        const post = await Post.deleteMany({});
        successHandle(res, post);
    } else if(url.startsWith('/posts/') && method === 'DELETE') {
        try {
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
    } else if(url.startsWith('/posts/') && method === 'PATCH') {
        req.on('end', async () => {
            try {
                const id = url.split('/').pop();
                const data = JSON.parse(body);
                const updatePost = await Post.findByIdAndUpdate(id, data, { new: true });
                if(updatePost) {
                    successHandle(res, updatePost);
                } else {
                    errorHandle(res);
                }
            } catch (err) {
                errorHandle(res, err);
            }
        });
    } else if(method === 'OPTIONS') {
        successHandle(res);

    } else {
        errorHandle(res, "無此網站路由", 404);
    }
}
const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3000);