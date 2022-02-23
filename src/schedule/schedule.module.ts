import { forwardRef, Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleResolver } from './schedule.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Schedule } from './schedule.entity'
import { User } from 'src/users/user.entity'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, User])],
  providers: [ScheduleService, ScheduleResolver, UsersService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
