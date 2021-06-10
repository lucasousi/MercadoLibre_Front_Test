import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import routes from './routes';
import { firebaseInitialize } from './services/firebase.service';

const port = 3001;
const app = express();
firebaseInitialize();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/api', routes);
const server = app.listen(port);
