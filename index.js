const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});



const app = express();

// here we don't have to write ip address manually if we write mongo than it automatically grab mongo container ip address
//  learning-node-app-1 to  learning-mongo-1
// .connect('mongodb://root:root@172.25.0.3:27017/?authSource=admin')
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("successfully connected to mongodb"))
        .catch(err => {
            console.log("err.message", err.message);
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

app.enable('trust proxy');
app.use(cors());
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,

    cookie: {
        secure: false,
        saveUninitialized: false,
        resave: false,
        httpOnly: true,
        maxAge: 30000
    },

}));

app.use(express.json())



app.get('/api/v1', (req, res) => {
    res.send('Hello World');
    console.log("yeah it ran");
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
