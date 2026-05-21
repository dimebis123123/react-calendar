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
	return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
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
			return next(ApiError.badRequest('Некорректные данные bruh'))
		}
		const candidate = await User.findOne({ where: { email } })

		if (candidate) {
			let comparePassword = bcrypt.compareSync(
				password,
				candidate.get('password') as string,
			)
			if (!comparePassword) {
				return next(ApiError.badRequest('Неверный пароль чел'))
			}
			const token = generateJwt(candidate.id, candidate.email, candidate.role)
			return res.json({ token })
		} else {
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({ email, role, password: hashPassword })
			const token = generateJwt(user.id, user.email, user.role)
			return res.json({ token })
		}
	}
	async check(req: Request, res: Response, next: NextFunction) {
		try {
			const tokenLocal = req.headers.authorization?.split(' ')[1]
			if (!tokenLocal) {
				return next(new ApiError(401, 'Не авторизован'))
			}
			const decoded = jwt.verify(tokenLocal, process.env.JWT_SECRET)

			const token = generateJwt(decoded.id, decoded.email, decoded.role)
			return res.json({ token })
		} catch (error) {
			return next(new ApiError(401, 'Не авторизован'))
		}
	}
}
export default new MainController()
