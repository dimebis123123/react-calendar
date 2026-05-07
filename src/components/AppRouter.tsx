import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'
import Login from '../pages/Login'

const AppRouter: FC = () => {
	const auth = true
	return (
		<Routes>
			{auth &&
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
