import { jwtDecode } from 'jwt-decode'
import { $host, $authHost } from '.'
import { EventState } from '../store/slices/eventSlice'

interface TokenPayload {
	id: number
	email: string
	role: string
}

export const login = async (email: string, password: string) => {
	try {
		const { data } = await $host.post('api/login', {
			email,
			password,
			role: 'ADMIN',
		})
		localStorage.setItem('token', data.token)
		return jwtDecode<TokenPayload>(data.token)
	} catch (error: any) {
		const message = error.response?.data?.message || 'Неизвестная ошибка'

		alert(message)

		return message
	}
}
export const createMyEvent = async (event: EventState) => {
	try {
		const { data } = await $authHost.post('api/createMyEvent', event)
		return 'Экспедиция успешно назначена!'
	} catch (error: any) {
		const message = error.response?.data?.message || 'Неизвестная ошибка'

		alert(message)
	}
}
export const check = async () => {
	try {
		const { data } = await $authHost.get('api/check')
		localStorage.setItem('token', data.token)

		return jwtDecode<TokenPayload>(data.token)
	} catch (error: any) {
		console.log('Ошибка авторизации', error.response?.status)

		localStorage.removeItem('token')

		return null
	}
}
export const getGuests = async () => {
	try {
		const { data } = await $authHost.get('api/getGuests')

		return data
	} catch (error: any) {
		console.log('Ошибка авторизации', error.response?.status)

		return null
	}
}
export const getEvents = async () => {
	try {
		const { data } = await $authHost.get('api/getEvents')
		console.log(data)

		return data
	} catch (error: any) {
		console.log('Ошибка авторизации', error.response?.status)

		return null
	}
}
