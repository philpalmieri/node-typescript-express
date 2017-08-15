import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import { FetchRouter } from './routes/FetchRouter';
import { AnalyticsRouter } from './routes/AnalyticsRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor(private fetchRouter:FetchRouter,
              private analyticsRouter: AnalyticsRouter) {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!',
        version: "0.2.0"
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/fetch', this.fetchRouter.router);
    this.express.use('/api/v1/analytics', this.analyticsRouter.router);
  }
  

}

export default new App( new FetchRouter(), 
                        new AnalyticsRouter()).express;