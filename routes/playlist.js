import express from 'express';
import {
	addToList,
	getList,
	removeFromList
} from '../controllers/playlist.js';
import isAuth from '../middleware/is_auth.js';

const playlistsRouter = express.Router();

playlistsRouter.get('/', isAuth, getList);
playlistsRouter.post('/', isAuth, addToList);
playlistsRouter.post('/delete', isAuth, removeFromList);

export default playlistsRouter;
