import React, { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import useLoginService from 'src/services/login.service';
import API from 'src/services/service';
import { toTitleCase } from 'src/utils/functions';

const PrivateRoute = (props: RouteProps) => {
	const location = useLocation();
	const { isAuthenticatedSync } = useLoginService();
	const [isAuth] = useState(isAuthenticatedSync());

	// Detect Route Change
	useEffect(() => {
		handleRouteChange();

		return () => {
			handleRouteComponentUnmount();
		};
	}, [location?.pathname]);

	function handleRouteChange() {
		const trustlyPathname = toTitleCase(location?.pathname?.substring(1));
		document.title = `Mercado Livre - ${trustlyPathname}`;
	}

	function handleRouteComponentUnmount() {
		API.finishPendingRequests('RouteChangeCancelPendingRequests');
	}

	return isAuth ? (
		<>
			<main>
				<Route {...props} />
			</main>
		</>
	) : (
		<Redirect to='/login' />
	);
};

export default PrivateRoute;
