import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleResolver } from './schedule.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Schedule } from './schedule.entity'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), UsersModule],
  providers: [ScheduleService, ScheduleResolver]
})
export class ScheduleModule {}
