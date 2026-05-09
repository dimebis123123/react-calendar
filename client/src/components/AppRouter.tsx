import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'
import Login from '../pages/Login'
import { useAppSelector } from '../hooks'

const AppRouter: FC = () => {
	const isAuth = useAppSelector(state => state.user.isAuth)
	return (
		<Routes>
			{isAuth &&
				privateRoutes.map(({ path, component }) => (
					<Route key={path} path={path} element={component} />
				))}
			{publicRoutes.map(({ path, component }) => (
				<Route key={path} path={path} element={component} />
			))}
			<Route path='*' element={<Login />} />
		</Routes>
	)
}

export default AppRouter
