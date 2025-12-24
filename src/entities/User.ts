import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm"
import { Product } from "./Product.js"
import { Order } from "./Order.js"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany(() => Product, (product) => product.creator)
    products: Relation<Product>[]

    @OneToMany(() => Order, (order) => order.creator)
    orders: Relation<Order>[]
}