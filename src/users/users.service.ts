import { ConsoleLogger, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Schedule } from 'src/schedule/schedule.entity'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { FindUserInput } from './dto/find-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(input: FindUserInput): Promise<User> {
    return this.usersRepository.findOne(input)
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput)
    // newUser = []

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

  async findAllUsersInSchedule(scheduleId: string): Promise<User[]> {
    const users = this.usersRepository.find({ schedule_id: scheduleId })

    return users
  }

  // async findByScheduleId(scheduleId: string): Promise<User> {
  //   const user = this.usersRepository.findOneOrFail({
  //     schedules:
  //   })
  // }

  async addUserToSchedule(userId: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({ id: userId })

    return this.usersRepository.save(user)
  }
}
