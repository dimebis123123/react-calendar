const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express'

import { JwtPayload } from 'jsonwebtoken'

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload & {
				id: number
				email: string
			}
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'Не авторизован' })
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decoded

		next()
	} catch (e) {
		return res.status(401).json({ message: 'Неверный токен' })
	}
}
