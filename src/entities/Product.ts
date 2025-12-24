import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm"
import { User } from "./User.js";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    quantity: number

    @Column()
    image_url: string
    
    @ManyToOne(() => User, (creator) => creator.products, { cascade: true })
    creator: Relation<User>
}