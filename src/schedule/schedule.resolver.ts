import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { CreateScheduleInput } from './dto/create-schedule.input'
import { FindScheduleInput } from './dto/find-schedule.input'
import { Schedule } from './schedule.entity'
import { ScheduleService } from './schedule.service'

@Resolver(of => Schedule)
export class ScheduleResolver {
  constructor(
    private scheduleService: ScheduleService,
    private usersService: UsersService
  ) {}

  @Query(returns => [Schedule])
  schedules() {
    return this.scheduleService.listAllSchedules()
  }

  @Query(returns => Schedule)
  schedule(@Args('input') input: FindScheduleInput) {
    return this.scheduleService.getSchedule(input)
  }

  @Mutation(returns => Schedule)
  createSchedule(@Args('input') input: CreateScheduleInput): Promise<Schedule> {
    return this.scheduleService.createSchedule(input)
  }

  @ResolveField(returns => User)
  owner(@Parent() schedule: Schedule): Promise<User | null> {
    return this.scheduleService.getOwner(schedule?.owner?.id)
  }
}
