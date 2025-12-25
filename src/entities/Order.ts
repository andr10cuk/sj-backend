import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    value: number
    
    @Column()
    quantity: number

    @CreateDateColumn()
    created_at: string

    @UpdateDateColumn()
    updated_at: string
    
    @ManyToOne(() => User, (creator) => creator.orders, { cascade: true })
    creator: Relation<User>

    @ManyToOne(() => Product, (product) => product.orders, { cascade: true })
    product: Relation<Product>
}