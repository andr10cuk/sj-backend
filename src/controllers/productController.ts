import { Request, Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Product } from '../entities/Product.js'

export const createProduct = async (req: Request, res: Response) => {
    console.log('post prorducts')
    res.status(200).json('post products')
}

export const allProducts = async (req: Request, res: Response) => {

}

export const getProduct = async (req: Request, res: Response) => {

}

export const updateProduct = async (req: Request, res: Response) => {

}

export const deleteProduct = async (req: Request, res: Response) => {

}