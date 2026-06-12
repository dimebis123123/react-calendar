import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

import ApiError from '../error/ApiError'
import { Event, User } from '../models'
import { Model } from 'sequelize'
import sequelize from '../db'

const jwt = require('jsonwebtoken')

interface RegistrationBody {
	email: string
	password: string
	role: string
}
interface EventState {
	author: string
	guests: any[]
	date: string
	description: string
	title: string
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
	async createMyEvent(
		req: TypedRequestBody<EventState>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { guests, date, description, title } = req.body

			if (!req.user) {
				return res.status(401).json({ message: 'Не авторизован' })
			}

			const creator = await User.findOne({
				where: { email: req.user.email },
			})

			if (!creator) {
				return res.status(404).json({ message: 'Создатель не найден' })
			}

			const invitedGuests = await User.findAll({
				where: { email: guests },
			})

			if (!invitedGuests.length) {
				return res.status(400).json({ message: 'Гости не найдены' })
			}

			await sequelize.transaction(async t => {
				const event = await creator.createCreatedEvent(
					{ date, title, description },
					{ transaction: t },
				)

				await event.addParticipants(invitedGuests, { transaction: t })
			})

			return res.status(201).json({ message: 'Успешно' })
		} catch (e: any) {
			console.error(e)
			return res.status(500).json({ message: e.message })
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
		} catch (e: any) {
			res.status(500).json({ message: e.message })
		}
	}
	async getGuests(req: Request, res: Response, next: NextFunction) {
		try {
			const guests = await User.findAll()
			return res.json(guests)
		} catch (e: any) {
			res.status(500).json({ message: e.message })
		}
	}
	async getEvents(req: Request, res: Response, next: NextFunction) {
		try {
			const events = await Event.findAll({
				include: [
					{
						model: User,
						as: 'participants',
						attributes: ['id', 'email'],
					},
					{ model: User, as: 'creator', attributes: ['id', 'email'] },
				],
			})

			return res.json(events)
		} catch (e: any) {
			res.status(500).json({ message: e.message })
		}
	}
}
export default new MainController()
