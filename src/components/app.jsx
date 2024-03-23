import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import NoMatch from './pages/no-match'
import Navigation from './navigation'
import Urls from './pages/urls'

export default function App() {
	return (
		<div className='app'>
				<Navigation />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/urls' element={<Urls />} />
					<Route element={<NoMatch />} />
				</Routes>
		</div>
	)
}
