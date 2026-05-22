import { Layout, Row } from 'antd'
import React, { FC } from 'react'
import LoginForm from '../components/LoginForm'

const Login: FC = () => {
	return (
		<Layout>
			<Row
				justify='center'
				align='middle'
				className='h100'
				style={{ flexDirection: 'column', gap: '20px' }}
			>
				<h1>Добро пожаловать</h1>
				<LoginForm></LoginForm>
			</Row>
		</Layout>
	)
}

export default Login
