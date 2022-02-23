import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ScheduleModule } from './schedule/schedule.module'
import { User } from './users/user.entity'
import { Schedule } from './schedule/schedule.entity'
import { ScheduleService } from './schedule/schedule.service'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      host: 'kesavan.db.elephantsql.com',
      username: 'qswpawdc',
      database: 'qswpawdc',
      password: 'em8BUl4YiyiTjtcInBNnYPPXWn83XK9m'
    }),
    UsersModule,
    ScheduleModule,
    TypeOrmModule.forFeature([User, Schedule]),
    
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
