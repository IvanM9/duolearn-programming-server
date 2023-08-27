import { App } from '@/app';
import { UserController } from '@controllers/users.controller';
import { ValidateEnv } from '@utils/validateEnv';
import { ActivitiesController } from '@controllers/activities.controller';
import { StadisticsController } from '@controllers/stadistics.controller';

ValidateEnv();

const app = new App([UserController, ActivitiesController, StadisticsController]);
app.listen();
