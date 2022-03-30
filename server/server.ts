import http from 'http';
import express, { Express } from 'express';
import 'dotenv/config';

require('dotenv').config()

const routes = require('./routes/route.route');

const router: Express = express();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/** Routes */
router.use('/', routes);

const httpServer = http.createServer(router);

const PORT: any = process.env.PORT;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

