import { Router } from 'express';

import { checkToken } from '../middlewares/firebase-auth.middleware';
import Route from '../models/route.model';
import authRouter from './auth.route';
import searchRouter from './search.route';

const routes = Router();

const publicRoutes = [{ path: '/auth', router: authRouter }] as Route[];
const privateRoutes = [
	{ path: '/search', router: searchRouter, checkTokenFunction: checkToken },
] as Route[];

publicRoutes.forEach((item) => routes.use(item.path, item.router));
privateRoutes.forEach((item) =>
	item.checkTokenFunction
		? routes.use(item.path, item.checkTokenFunction, item.router)
		: routes.use(item.path, item.router),
);

export default routes;
