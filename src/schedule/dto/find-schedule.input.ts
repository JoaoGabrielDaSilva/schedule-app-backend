import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FindScheduleInput {
  @Field()
  id: string
}
