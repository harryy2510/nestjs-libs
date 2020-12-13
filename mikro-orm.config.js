exports.default = {
  host: 'localhost',
  port: 5555,
  dbName: 'test',
  user: 'test',
  password: 'test',
  type: 'postgresql',
  autoLoadEntities: true,
  entities: ['./dist/src/**/*.entity.{js,ts}'],
  entitiesTs: ['./src/**/*.entity.{js,ts}'],
  debug: true,
};
