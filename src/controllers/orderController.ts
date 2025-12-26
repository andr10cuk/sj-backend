import { Request, Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { BaseOrderDto, OrderDto } from '../types/EntityDTOs.js'
import { Product } from '../entities/Product.js'
import { Order } from '../entities/Order.js'
import { APIErrorCommon } from '../types/Error.js'
import { User } from '../entities/User.js'
import { NewOrderRes, OrdersListingPage } from '../types/Responses.js'
import { validate as uuidValidate } from 'uuid'

const productRepository = AppDataSource.getRepository(Product)
const orderRepository = AppDataSource.getRepository(Order)
const userRepository = AppDataSource.getRepository(User)

export const makeOrder = async (req: Request, res: Response) => {
    const order: BaseOrderDto = req.body

    const product = await productRepository.findOne({ where: { id: order.product_id }})
    if(!product) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    const user = await userRepository.findOne({ where: { id: order.user_id } })
    if(!user) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    if(order.quantity > product.quantity) {
        const error: APIErrorCommon = {
            failed: true,
            code: "OUT_OF_STOCK"
        }
        return res.status(400).json(error)
    }
    product.quantity -= order.quantity
    await productRepository.save(product)

    const newOrder = orderRepository.create({
        value: order.value,
        quantity: order.quantity,
        creator: user,
        product: product
    })
    const savedOrder = await orderRepository.save(newOrder)

    const responseAPI: NewOrderRes = {
        failed: false,
        order: {
            order_id: savedOrder.id,
            product_title: savedOrder.product.title,
            product_value: savedOrder.product.price,
            product_quantity: savedOrder.product.quantity,
            created_at: savedOrder.created_at
        }
    }
    return res.status(201).json(responseAPI)
}

export const userOrders = async (req: Request, res: Response) => {
    const user_id = req.params.userId
    // provera da li je id tipa uuid
    if(!uuidValidate(user_id)) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    const id = req.userId
    if(id !== user_id) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NOT_YOURS"
        }
        return res.status(400).json(error)
    }

    const userOrders: Order[] = await orderRepository.find({
        relations: {
            creator: true,
            product: true,
        },
        where: {
            creator: {
                id: user_id
            }
        }
    })

    const orderDTOs: OrderDto[] = []
    userOrders.forEach((order) => {
        const orderDTO: OrderDto = {
            order_id: order.id,
            value: order.value,
            quantity: order.quantity,
            user_id: order.creator.id,
            product_id: order.product.id,
            created_at: order.created_at,
            updated_at: order.updated_at
        }

        orderDTOs.push(orderDTO)
    })

    const responseAPI: OrdersListingPage = {
        orders: orderDTOs,
        total: orderDTOs.length
    }
    return res.status(200).json(responseAPI)
}