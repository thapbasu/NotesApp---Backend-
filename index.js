const express = require('express');
const { connection } = require('./db');
require('dotenv').config();
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
const { noteRouter } = require('./routes/note.routes');
const app = express();

const corsOptions = {
  origin: '*', // Allow any origin during development
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/user', userRouter);
app.use('/note', noteRouter);
app.get('/', (req, res) => {
  res.send({
    message: 'api is working now',
  });
});
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log('database is connected');
    console.log(`server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
