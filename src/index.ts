import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import cors from 'cors'

AppDataSource.initialize().then(() => {
    const app = express()

    app.use(cors())
    app.use(express.json())

    app.use(routes)

  /*  app.get('/', (req, res) => {
        return res.json('Tudo certo!')
    })
*/
    return app.listen(process.env.PORT, () => {
        console.log(`🚀 🆙 Server is running on http://localhost:${process.env.PORT}`)
    })

})