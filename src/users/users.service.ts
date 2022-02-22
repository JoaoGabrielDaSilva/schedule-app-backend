import { ConsoleLogger, forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Schedule } from 'src/schedule/schedule.entity'
import { ScheduleService } from 'src/schedule/schedule.service'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { FindUserInput } from './dto/find-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => ScheduleService))
    private scheduleService: ScheduleService
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(input: FindUserInput): Promise<User> {
    return this.usersRepository.findOne(input)
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput)

    return this.usersRepository.save(newUser)
  }

  async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const { id } = updateUserInput

    const user = await this.usersRepository.findOneOrFail({ id })

    const updatedUser = {
      ...user,
      ...updateUserInput
    }

    return this.usersRepository.save(updatedUser)
  }

  async deleteUser(deleteUserInput: DeleteUserInput): Promise<User> {
    const { id } = deleteUserInput

    const user = await this.usersRepository.findOneOrFail({ id })

    await this.usersRepository.delete(user)

    return user
  }


  async getSchedules(userId: string): Promise<Schedule[]> {
    const schedules = await this.scheduleService.getUserSchedules(userId)

    return schedules
  }
}
