import express from 'express'
import mainController from '../controllers'

const router = express()

router.post('/login', mainController.login)
router.get('/auth')

export default router
