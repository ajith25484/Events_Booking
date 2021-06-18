const express = require('express')
const app = express()
const dotEnv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

//configure cors
app.use(cors());

//configure express to receive the form data
app.use(express.json());

//configure dotEnv
dotEnv.config({path:'./.env'});

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;



//connect to mongo DB
mongoose.connect(process.env.MONGO_DB_URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((res) => {
    console.log(`Connected to MongoDB server successfully....`);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

//basic request
app.get('/', (req, res) => {
    res.send(`welcome to events booking app`)
})

//router configuration
app.use('/api/users', require('./router/userRouter'))
app.use('/api/events', require('./router/eventRouter'))

app.listen(port, hostname, () => {
    console.log(`Express server is started at http://${hostname}:${port}`);
})