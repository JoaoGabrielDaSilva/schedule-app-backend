import { Field, InputType } from '@nestjs/graphql'
import { IsAlpha, IsEmail, IsUUID } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsUUID()
  @Field()
  id: string

  @Field()
  @Field({ nullable: true })
  name?: string

  // @IsEmail()
  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  profile_picture?: string

  @Field({ nullable: true })
  socket_id?: string

  // @Field({nullable: true})
  // schedule_id?: string
}
