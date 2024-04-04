import express from 'express'
import { dbConnection } from './dbConnection.js'
import { userModel } from './Models/user.model.js'
import userRouter from './modules/user/user.routes.js'
import categoryRouter from './modules/category/category.routes.js'
import brandRouter from './modules/brand/brand.routes.js'
import productRouter from './modules/product/product.routes.js'
import cors from "cors"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(brandRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use((err, req, res, next) => {
  res.json({ error: err })
})
app.get('/', (req, res) => res.send('Hello World!'))
dbConnection()
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))