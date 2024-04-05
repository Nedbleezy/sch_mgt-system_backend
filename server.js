import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

// other imports
import { dbConnect, OnErrordbConnect, OnDisconnectdbConnect } from './utils/dBConnect.js';
import schoolRoutes from './routes/SchoolRoutes.js';
import classRoutes from './routes/ClassRoute.js';
import teacherRoutes from './routes/TeacherRoutes.js';
import VerifyTokenRoutes from './routes/VerifyTokenRoutes.js';

//mongoose MONGODB connections
dbConnect();
OnErrordbConnect();
OnDisconnectdbConnect();
//constants

const PORT = process.env.PORT || 4000;

//initialization

const app = express();

//app middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

//routes middlewares

app.use('/api/v1/', schoolRoutes);
app.use('/api/v1/', classRoutes);
app.use('/api/v1/', teacherRoutes);
app.use('/api/v1/school/verify', VerifyTokenRoutes);

//listen on
app.listen(PORT, () => console.log(`listening on ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection ${err}`);
});
process.on('uncaughtException', (err) => {
  console.log(`uncaughtException ${err}`);
});
