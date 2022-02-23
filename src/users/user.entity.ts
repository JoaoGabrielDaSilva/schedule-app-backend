import { Field, ObjectType } from '@nestjs/graphql'
import { Schedule } from 'src/schedule/schedule.entity'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToMany(() => Schedule, schedule => schedule.owner)
  @Field(type => [Schedule], { nullable: true })
  @JoinTable({
    name: 'user_schedules',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'schedule_id',
      referencedColumnName: 'id'
    }
  })
  schedules?: Schedule[]

  // @ManyToOne(() => Schedule, schedule => schedule.participants)
  // @Field(type => Schedule)
  // schedules: Schedule[]
}
