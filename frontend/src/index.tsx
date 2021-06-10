import './index.scss';
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'src/styles/variables.scss';
import 'src/styles/global.scss';
import 'src/styles/override_nprogress.scss';
import 'src/styles/override_bootstrap.scss';
import '@fortawesome/fontawesome-free/js/all.js';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);

reportWebVitals();
