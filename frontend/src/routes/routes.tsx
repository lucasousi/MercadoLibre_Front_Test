import { lazy } from 'react';
import { Redirect, RouteProps } from 'react-router-dom';

const Login = lazy(() => import('src/pages/Login/Login'));
const NotFound = lazy(() => import('src/pages/NotFound/NotFound'));

export const publicRoutes: RouteProps[] = [
	{ path: '/', exact: true, component: () => <Redirect to='/login' /> },
	{ path: '/404', component: NotFound },
	{ path: '/login', component: Login },
];

const Catalog = lazy(() => import('src/pages/Catalog/Catalog'));

export const privateRoutes: RouteProps[] = [
	{ path: '/catalogo', component: Catalog },
];
