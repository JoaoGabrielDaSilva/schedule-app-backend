import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'
import {
  Column,
  Connection,
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
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column({ type: 'date' })
  init_date: Date

  @Field()
  @Column({ type: 'date' })
  end_date: Date

  @Field()
  @Column()
  init_hour: string

  @Field()
  @Column()
  end_hour: string

  @ManyToOne(() => User, user => user.schedules)
  @Field(() => User, {nullable: true})
  owner: User

  @Field({ nullable: true })
  @Column({ nullable: true })
  owner_id: string

  // @ManyToMany(() => User, user => user.schedules)
  // @Field(type => [String])
  // @JoinTable()
  // participants: string[]
}
