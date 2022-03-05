import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number
    
    @Column()
    title!: String

    @Column()
    text!: String

    @CreateDateColumn()
    createAt!: Date

    @UpdateDateColumn()
    updateAt!: Date
}