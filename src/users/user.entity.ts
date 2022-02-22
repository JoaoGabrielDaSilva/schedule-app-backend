import { Field, ObjectType } from '@nestjs/graphql'
import { Schedule } from 'src/schedule/schedule.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  profile_picture?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  socket_id?: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  schedule_id?: string

  @OneToOne(() => Schedule, schedule => schedule.owner)
  @Field(type => [Schedule])
  @JoinColumn()
  schedules?: Schedule[]

  // @ManyToMany(() => Schedule, schedule => schedule.participants)
  // @JoinTable()
  // @Field(type => [Schedule], { nullable: true })
  // schedules: Schedule[]
}
