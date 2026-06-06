import React, { FC, useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Layout, Spin } from 'antd'
import './App.css'
import { check, getGuests } from './http/api'
import { useAppDispatch } from './hooks'
import { setAuth, setEmail } from './store/slices/userSlice'
import { setGuest } from './store/slices/eventSlice'

const App: FC = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setTimeout(() => {
			check()
				.then(data => {
					if (data) {
						dispatch(setAuth(true))
						dispatch(setEmail(data.email))
					}
				})
				.finally(() => setLoading(false))

			getGuests().then(data => {
				dispatch(setGuest(data))
			})
		}, 1000)
	}, [])
	if (loading) {
		return <Spin size='large'></Spin>
	}
	return (
		<Layout>
			<NavBar></NavBar>
			<Layout.Content>
				<AppRouter />
			</Layout.Content>
		</Layout>
	)
}

export default App
