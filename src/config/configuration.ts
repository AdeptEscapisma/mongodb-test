import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface Configuration {
  db: MongooseModuleOptions;
}

export default (): Configuration => {
  const { MONGODB_URI } = process.env;

  return {
    db: {
      uri: MONGODB_URI,
    },
  };
};
