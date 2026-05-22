import React, { FC } from 'react'
import { Layout, Menu, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../router'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setAuth, setEmail } from '../store/slices/userSlice'
const NavBar: FC = () => {
	const navigate = useNavigate()
	const { isAuth, email } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const logout = () => {
		dispatch(setEmail(''))
		localStorage.removeItem('token')
		dispatch(setAuth(false))
	}
	return (
		<Layout.Header>
			<Row justify='end'>
				{isAuth ? (
					<>
						<Menu
							style={{ width: '100%', justifyContent: 'flex-end' }}
							theme='dark'
							mode='horizontal'
							selectable={false}
						>
							<Menu.Item key={2}>{email}</Menu.Item>
							<Menu.Item
								onClick={() => {
									logout()
									navigate(RouteNames.LOGIN)
								}}
								key={1}
							>
								Выйти
							</Menu.Item>
						</Menu>
					</>
				) : (
					<Menu theme='dark' mode='horizontal'></Menu>
				)}
			</Row>
		</Layout.Header>
	)
}

export default NavBar
