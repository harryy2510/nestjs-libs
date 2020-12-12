import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { NodeModule } from './node/node.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      host: 'localhost',
      port: 5555,
      database: 'test',
      username: 'test',
      password: 'test',
      type: 'postgres',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    NodeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
