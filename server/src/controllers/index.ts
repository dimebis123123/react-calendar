import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import ApiError from '../error/ApiError'
import { User } from '../models'
import { Model } from 'sequelize'

const jwt = require('jsonwebtoken')

interface RegistrationBody {
	email: string
	password: string
	role: string
}

type TypedRequestBody<T> = Request<{}, {}, T>

const generateJwt = (id: number, email: string, role: string) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})
}

class MainController {
	async login(
		req: TypedRequestBody<RegistrationBody>,
		res: Response,
		next: NextFunction,
	) {
		const { email, password, role } = req.body

		if (!email || !password) {
			next(ApiError.badRequest('Некорректные данные bruh'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			let comparePassword = bcrypt.compareSync(password, candidate.password)
			if (!comparePassword) {
				return next(ApiError.badRequest('Неверный пароль чел'))
			}
			const token = generateJwt(candidate.id, candidate.email, candidate.role)
			return res.json({ token })
		}
	}
}
export default new MainController()
