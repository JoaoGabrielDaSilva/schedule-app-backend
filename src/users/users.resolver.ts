import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from './dto/create-user.input'
import { DeleteUserInput } from './dto/delete-user.input'
import { FindUserInput } from './dto/find-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Resolver(returns => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query(() => User)
  user(@Args('findUserInput') findUserInput: FindUserInput): Promise<User> {
    return this.usersService.findOne(findUserInput)
  }

  @Mutation(returns => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.usersService.createUser(createUserInput)
  }

  @Mutation(returns => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput)
  }

  @Mutation(() => User)
  deleteUser(
    @Args('deleteUserInput') deleteUserInput: DeleteUserInput
  ): Promise<User> {
    return this.usersService.deleteUser(deleteUserInput)
  }
}
