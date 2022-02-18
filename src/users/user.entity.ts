import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  password: string

  
  @Column({nullable: true})
  @Field({ nullable: true })
  profile_picture?: string

  @Column({nullable: true})
  @Field({ nullable: true })
  socket_id?: string

  @Column({nullable: true})
  @Field({ nullable: true })
  schedule_id?: string
}
