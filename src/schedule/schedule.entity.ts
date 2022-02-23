import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => User, user => user.schedules)
  @Field(type => [User], {nullable: true})
  @JoinTable({
    joinColumn: {
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      referencedColumnName: 'id'
    }
  })
  participants: User[]
}
