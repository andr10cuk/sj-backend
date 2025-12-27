import express, { Application } from "express"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import "reflect-metadata" // Potrebno za TypeORM
import { AppDataSource } from "./data-source.js"
import { APIErrorCommon } from "./types/Error.js"
import paginate from 'express-paginate'

const app: Application = express()
const port = 3000

app.use(express.json())

try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")

    app.use('/auth', userRoutes)
    app.use('/products', productRoutes)
    app.use('/orders', orderRoutes)

    // express-paginate
    app.use(paginate.middleware(10, 25))

    // globalni error handler
    app.use((err, req, res, next) => {
        console.log('Server Error: ', err)
        const error: APIErrorCommon = {
            failed: true,
            code: "INTERNAL_ERROR"
        }
        res.status(500).json(error)
    })

    app.listen(port, () => {
        console.log(`Server je pokrenut na http://localhost:${port}`)
    })
} catch (error) {
    console.error("Error during Data Source initialization", error)
}
