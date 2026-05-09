import express from 'express'
import dotenv from 'dotenv'
const dotenvConfig = dotenv.config()
import './models'
import sequelize from './db'
import cors from 'cors'

const sequelizeDb = sequelize

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.status(200).json({ message: 'WORKING' })
})

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
