import express from 'express';
import cors from 'cors';
import routes from './modules/route.js';
import { connectdb } from './data/db.js';

export async function createServer() {
  try {
    
    
    const server = express();
    
    await connectdb();
    
    server.use(cors());
    
    
    
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));

    server.use('/', routes);
    return server;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
