import './common/env';
import Server from './common/server';
import routes from './routes';

require('@/models');

export default new Server()
  .router(routes)
  .listen(process.env.PORT);
