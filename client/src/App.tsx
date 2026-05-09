import React, { FC } from 'react'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { Layout } from 'antd'
import './App.css'

const App: FC = () => {
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
