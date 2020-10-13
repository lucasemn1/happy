import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import 'express-async-errors';
import '../database/connection';
import routes from './routes';
import errorHandler from '../errors/handler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));
app.use(errorHandler);

export default app;