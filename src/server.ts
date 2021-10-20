process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@/routes/user.route';
import validateEnv from '@utils/validateEnv';
import NewsletterRoute from './routes/newsletter.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new NewsletterRoute()]);

app.listen();
