import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity() // do tablde
export class User extends BaseEntity {
    @Field(__type => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({unique: true})
    username!: string
    
    @Field()
    @Column({unique: true})
    email!: String

    @Column()
    password!: String

    @Field()
    @CreateDateColumn()
    createdAt!: Date

    @Field()
    @UpdateDateColumn()
    updateAt!: Date
}