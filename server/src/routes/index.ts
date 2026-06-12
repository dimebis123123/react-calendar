import express from 'express'
import mainController from '../controllers'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express()

router.post('/login', mainController.login)
router.post('/createMyEvent', authMiddleware, mainController.createMyEvent)
router.get('/check', mainController.check)
router.get('/getGuests', mainController.getGuests)
router.get('/getEvents', mainController.getEvents)
export default router
