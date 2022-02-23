import { forwardRef, Inject, Injectable } from '@nestjs/common'
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
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async getSchedules(): Promise<Schedule[]> {
    return this.schedulesRepository.find({ relations: ['owner'] })
  }

  async getSchedule(input: FindScheduleInput) {
    return this.schedulesRepository.findOne({
      where: { id: input.id },
      relations: ['owner']
    })
  }

  async createSchedule(input: CreateScheduleInput): Promise<Schedule> {
    const owner = await this.usersService.findOne({ id: input.owner_id })

    const schedule = this.schedulesRepository.create({ ...input, owner })

    return this.schedulesRepository.save(schedule)
  }

  async getOwner(ownerId: string): Promise<User> {
    return this.usersService.findOne({ id: ownerId })
  }

  async getUserSchedules(userId: string): Promise<Schedule[]> {
    return this.schedulesRepository.find({
      where: { owner_id: userId },
      relations: ['owner']
    })
  }

  async getParticipants(scheduleId: string): Promise<User[]> {
    return this.usersService.findParticipantsInASchedule(scheduleId)
  }
}
