import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() // do tablde
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    username!: string

    @Column({unique: true})
    email!: String

    @Column()
    password!: String

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updateAt!: Date
}