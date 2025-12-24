import express, { Application } from "express"
import userRoutes from './routes/userRoutes.js'
import "reflect-metadata" // Potrebno za TypeORM
import { AppDataSource } from "./data-source.js"

const app: Application = express()
const port = 3000

app.use(express.json())

try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")

    app.use('/auth', userRoutes)

    app.listen(port, () => {
        console.log(`Server je pokrenut na http://localhost:${port}`)
    })
} catch (error) {
    console.error("Error during Data Source initialization", error)
}
