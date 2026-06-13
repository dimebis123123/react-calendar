import React, { FC, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import { login } from '../http/api'
import { setEmail, setAuth, setError } from '../store/slices/userSlice'
import { useAppDispatch } from '../hooks'

const LoginForm: FC = () => {
	type FieldType = {
		email?: string
		password?: string
		remember?: string
	}

	const [emailValue, setEmailValue] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const dispatch = useAppDispatch()
	const submit = async () => {
		let userdata
		userdata = await login(emailValue, password)
		if (typeof userdata === 'object' && 'email' in userdata) {
			dispatch(setEmail(userdata.email))
			dispatch(setAuth(true))
		} else {
			dispatch(setError(true))
			console.log(userdata)
			setErrorMessage(userdata)
		}
	}

	return (
		<Form onFinish={submit}>
			<Form.Item<FieldType>
				label='Почта Исследователя'
				name='email'
				rules={[
					{
						required: true,
						message: 'Пожалуйста введи свою почту путник!!!!!',
					},
				]}
			>
				<Input
					value={emailValue}
					onChange={e => {
						setEmailValue(e.target.value)
					}}
				/>
			</Form.Item>

			<Form.Item<FieldType>
				label='Пароль'
				name='password'
				rules={[{ required: true, message: 'Какое твоё секретное слово!' }]}
			>
				<Input.Password
					value={password}
					onChange={e => {
						setPassword(e.target.value)
					}}
				/>
			</Form.Item>
			{errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

			<Form.Item<FieldType>
				name='remember'
				valuePropName='checked'
				label={null}
			>
				<Checkbox>Запомнить меня</Checkbox>
			</Form.Item>

			<Form.Item label={null}>
				<Button type='primary' htmlType='submit'>
					Отправить
				</Button>
			</Form.Item>
		</Form>
	)
}

export default LoginForm
