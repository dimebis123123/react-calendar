import express from 'express'
import mainController from '../controllers'

const router = express()

router.post('/login', mainController.login)
router.post('/createMyEvent', mainController.createMyEvent)
router.get('/check', mainController.check)
router.get('/getGuests', mainController.getGuests)

export default router
