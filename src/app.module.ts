import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { NodeModule } from './node/node.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const logger = new Logger('MikroORM');

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
      },
    }),
    MikroOrmModule.forRoot({
      host: 'localhost',
      port: 5555,
      dbName: 'test',
      user: 'test',
      password: 'test',
      type: 'postgresql',
      autoLoadEntities: true,
      entities: ['./dist/src/**/*.entity.{js,ts}'],
      entitiesTs: ['./src/**/*.entity.{js,ts}'],
      highlighter: new SqlHighlighter(),
      debug: true,
      logger: logger.log.bind(logger),
    }),
    NodeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
