import { AppDataSource } from 'typeorm/data-source';

import { app } from './app';
import { env } from './env';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Database connection error', error);
  });

app.listen(env.PORT, () => {
  console.log(`🚀 Server started on port ${env.PORT}`);
});
