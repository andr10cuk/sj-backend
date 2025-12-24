import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
import { User } from "./User.js";
import { Order } from "./Order.js";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    description?: string | null

    @Column()
    price: number

    @Column()
    quantity: number

    @Column()
    image_url: string
    
    @ManyToOne(() => User, (creator) => creator.products, { cascade: true })
    creator: Relation<User>

    @OneToMany(() => Order, (order) => order.product)
    orders: Relation<Order>[]
}