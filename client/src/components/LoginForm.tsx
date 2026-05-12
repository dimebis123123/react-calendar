import React, { FC } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

type FieldType = {
	username?: string
	password?: string
	remember?: string
}

const LoginForm: FC = () => {
	return (
		<Form>
			<Form.Item<FieldType>
				label='Имя Исследователя'
				name='username'
				rules={[
					{ required: true, message: 'Пожалуйста введи свою почту путник!' },
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item<FieldType>
				label='Пароль'
				name='password'
				rules={[{ required: true, message: 'Какое твоё секретное слово!' }]}
			>
				<Input.Password />
			</Form.Item>

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
