import React, { FC, useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Layout, Spin } from 'antd'
import './App.css'
import { check, getEvents, getGuests } from './http/api'
import { useAppDispatch, useAppSelector } from './hooks'
import { setAuth, setEmail } from './store/slices/userSlice'
import { setEvents, setGuests } from './store/slices/eventSlice'

const App: FC = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)
	const user = useAppSelector(state => state.user.email)
	useEffect(() => {
		setTimeout(() => {
			if (user == '') {
				check()
					.then(data => {
						if (data) {
							dispatch(setAuth(true))
							dispatch(setEmail(data.email))
						}
					})
					.finally(() => setLoading(false))
			}
			if (user !== '') {
				getGuests().then(data => {
					dispatch(setGuests(data))
				})
				getEvents().then(data => dispatch(setEvents(data)))
			}
		}, 1000)
	}, [user])
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
