import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm"
import { User } from "./User.js";
import { Order } from "./Order.js";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

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

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
    
    @ManyToOne(() => User, (creator) => creator.products, { cascade: true })
    creator: Relation<User>

    @OneToMany(() => Order, (order) => order.product)
    orders: Relation<Order>[]
}