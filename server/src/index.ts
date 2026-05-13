import express from 'express'
import dotenv from 'dotenv'
const dotenvConfig = dotenv.config()
import './models'
import sequelize from './db'
import cors from 'cors'
import router from './routes'

const sequelizeDb = sequelize

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
	try {
		await sequelizeDb.authenticate()

		await sequelizeDb.sync()

		app.listen(PORT, () => console.log(PORT))
	} catch (e) {
		console.log(e)
	}
}

start()
