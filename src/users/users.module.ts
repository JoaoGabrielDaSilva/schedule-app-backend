import {  forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Schedule } from 'src/schedule/schedule.entity'
import { ScheduleModule } from 'src/schedule/schedule.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, Schedule]), forwardRef(() => ScheduleModule)],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
