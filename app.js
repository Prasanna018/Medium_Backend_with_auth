import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())
import db from './db_config/db-config.js'
app.use(express.json())

app.use(cors())
// ROUTERS
import AuthRoutes from './Routes/AuthRoutes.js'
import PostsRoutes from './Routes/PostsRoutes.js'

app.use('/api/auth', AuthRoutes)
app.use('/api/post', PostsRoutes);



export default app;