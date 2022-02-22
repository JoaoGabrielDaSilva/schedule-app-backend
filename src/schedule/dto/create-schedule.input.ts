import { Field, InputType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { IsDate, IsRFC3339 } from 'class-validator'
import { User } from 'src/users/user.entity'
import { Column } from 'typeorm'

@InputType()
export class CreateScheduleInput {
  @Field()
  title: string

  @Field()
  @IsDate()
  init_date: Date

  @Field()
  @IsDate()
  end_date: Date

  @Field()
  init_hour: string

  @Field()
  end_hour: string

  @Field(() => [String], { nullable: true })
  participants_ids?: string[]

  @Field({ nullable: true })
  owner_id?: string
}
