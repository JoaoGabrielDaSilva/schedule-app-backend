import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { CreateScheduleInput } from './dto/create-schedule.input'
import { FindScheduleInput } from './dto/find-schedule.input'
import { Schedule } from './schedule.entity'

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    private usersServices: UsersService
  ) {}

  async listAllSchedules(): Promise<Schedule[]> {
    return this.schedulesRepository.find({ relations: ['owner'] })
  }

  async getSchedule(input: FindScheduleInput) {
    return this.schedulesRepository.findOne({
      where: { id: input.id },
      relations: ['owner']
    })
  }

  async createSchedule(input: CreateScheduleInput): Promise<Schedule> {
    const owner = await this.usersServices.findOne({ id: input.owner_id })

    const schedule = this.schedulesRepository.create({ ...input, owner })

    return this.schedulesRepository.save(schedule)
  }

  async getUsers(scheduleId: string): Promise<User[]> {
    return this.usersServices.findAllUsersInSchedule(scheduleId)
  }

  async getOwner(ownerId: string): Promise<User | null> {
    return this.usersServices.findOne({ id: ownerId })
  }
}
