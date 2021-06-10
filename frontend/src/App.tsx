import './App.scss';

import React, { Suspense } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from 'src/components/PrivateRoute/PrivateRoute';
import { privateRoutes, publicRoutes } from 'src/routes/routes';

const App = () => {
	return (
		<Suspense fallback={<></>}>
			<HashRouter>
				<ToastContainer pauseOnFocusLoss />
				<Switch>
					{publicRoutes?.map((route, index) => (
						<Route key={index} {...route}></Route>
					))}
					{privateRoutes?.map((route, index) => (
						<PrivateRoute key={index} {...route}></PrivateRoute>
					))}
					<Redirect to='/404' />
				</Switch>
			</HashRouter>
		</Suspense>
	);
};

export default App;
