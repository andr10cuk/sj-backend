import { Request, Response } from 'express'
import { AppDataSource } from '../data-source.js'
import { Product } from '../entities/Product.js'
import { User } from '../entities/User.js'
import { BaseProductDto, ProductDto } from '../types/EntityDTOs.js'
import { APIErrorCommon } from '../types/Error.js'
import { DeleteProductRes, GetProductRes, NewProductRes, ProductListingPage, UpdateProductRes } from '../types/Responses.js'
import { validate as uuidValidate } from 'uuid'

const productRepository = AppDataSource.getRepository(Product)
const userRepository = AppDataSource.getRepository(User)

export const createProduct = async (req: Request, res: Response) => {
    const product: BaseProductDto = req.body; // Podaci za post iz tela zahteva

    const user = await userRepository.findOne({ where: { id: req.userId } })
    if(!user) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    const newProduct = productRepository.create(product)
    newProduct.creator = user
    const savedProduct = await productRepository.save(newProduct)

    const responseAPI: NewProductRes = {
        failed: false,
        product_id: savedProduct.id
    }
    return res.status(201).json(responseAPI)
}

export const allProducts = async (req: Request, res: Response) => {
    // Uzmi `limit` i `offset` iz express-paginate middleware-a
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const page = parseInt(req.query.page as string, 10) || 1
    // const offset = req.skip;
    const offset = (page - 1) * limit
    const user_id = req.query.creator;
    const older = req.query.older_first;

    const [products, total] = await productRepository.findAndCount({
        skip: offset,
        take: limit,
        relations: {
            creator: true,
        },
        where: {
            creator: {
                id: user_id as string
            }
        },
        order: {
            created_at: older === 'true' ? 'ASC' : undefined
        }
    })

    const productDTOs: ProductDto[] = [];
    products.forEach((product: Product) => {
        const p: ProductDto = {
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            image_url: product.image_url,
            product_id: product.id,
            creator: { user_id: product.creator.id, username: product.creator.username },
            created_at: product.created_at,
            updated_at: product.updated_at,
        }

        productDTOs.push(p)
    })
    const responseAPI: ProductListingPage = {
        products: productDTOs,
        total: total
    }

    return res.status(200).json(responseAPI)
}

export const getProduct = async (req: Request, res: Response) => {
    const product_id = req.params.productId
    // provera da li je id tipa uuid
    if(!uuidValidate(product_id)) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    const product = await productRepository.findOne({ 
        where: { id: product_id },
        relations: {
            creator: true,
        },
    })
    if(!product) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    const productDTO: ProductDto = {
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image_url: product.image_url,
        product_id: product.id,
        creator: { user_id: product.creator.id, username: product.creator.username },
        created_at: product.created_at,
        updated_at: product.updated_at,
    }

    const responseAPI: GetProductRes = {
        failed: false,
        product: productDTO
    }
    return res.status(200).json(responseAPI)
}

export const updateProduct = async (req: Request, res: Response) => {
    const product_id = req.params.productId
    // provera da li je id tipa uuid
    if(!uuidValidate(product_id)) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    let product = await productRepository.findOne({ 
        where: { id: product_id },
        relations: {
            creator: true,
        }
    })
    // da li postoji u bazi ovaj proizvod
    if(!product) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }
    // da li mozemo da menjamo proizvod
    if(product.creator.id !== req.userId) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NOT_YOURS",
        }
    
        return res
            .status(403)
            .json(error);
    }

    const reqProduct: Partial<BaseProductDto> = req.body
    product = { ...product, ...reqProduct }
    await productRepository.save(product)
    
    const responseAPI: UpdateProductRes = {
        failed: false,
    }
    return res.status(201).json(responseAPI)
}

export const deleteProduct = async (req: Request, res: Response) => {
    const product_id = req.params.productId
    // provera da li je id tipa uuid
    if(!uuidValidate(product_id)) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    const product = await productRepository.findOne({ 
        where: { id: product_id },
        relations: {
            creator: true,
        }
    })
    // da li postoji u bazi ovaj proizvod
    if(!product) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NO_SUCH_ENTITY"
        }
        return res.status(400).json(error)
    }

    // da li mozemo da menjamo proizvod
    if(product.creator.id !== req.userId) {
        const error: APIErrorCommon = {
            failed: true,
            code: "NOT_YOURS",
        }
    
        return res
            .status(403)
            .json(error);
    }

    await productRepository.remove(product)

    const responseAPI: DeleteProductRes = {
        failed: false
    }
    return res.status(200).json(responseAPI)
}