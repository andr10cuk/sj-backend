import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    value: number
    
    @Column()
    quantity: number

    @ManyToOne(() => User, (creator) => creator.orders, { cascade: true })
    creator: Relation<User>

    @ManyToOne(() => Product, (product) => product.orders, { cascade: true })
    product: Relation<Product>
}