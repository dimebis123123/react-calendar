import React, { FC } from 'react'
import { Layout, Menu, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../router'
import { useAppSelector } from '../hooks'
const NavBar: FC = () => {
	const navigate = useNavigate()
	const { isAuth, name } = useAppSelector(state => state.user)
	return (
		<Layout.Header>
			<Row justify='end'>
				{isAuth ? (
					<>
						<div style={{ color: 'white' }}>{name}</div>
						<Menu theme='dark' mode='horizontal' selectable={false}>
							<Menu.Item
								onClick={() => {
									navigate(RouteNames.LOGIN)
								}}
								key={1}
							>
								Выйти
							</Menu.Item>
						</Menu>
					</>
				) : (
					<Menu theme='dark' mode='horizontal'>
						<Menu.Item
							onClick={() => {
								navigate(RouteNames.LOGIN)
							}}
							key={1}
						>
							Логин
						</Menu.Item>
					</Menu>
				)}
			</Row>
		</Layout.Header>
	)
}

export default NavBar
