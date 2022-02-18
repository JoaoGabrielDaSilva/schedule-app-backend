import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class FindUserInput {
  
  @IsUUID()
  @Field()
  id: string
}