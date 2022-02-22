import { Field, InputType } from '@nestjs/graphql'
import { IsAlpha, IsEmail } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  profile_picture?: string

  @Field({ nullable: true })
  socket_id?: string
}
