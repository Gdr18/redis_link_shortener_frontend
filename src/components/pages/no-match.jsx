import React from 'react'
import { Link } from 'react-router-dom'

export default function noMatch() {
	return (
		<div className='no-match-class'>
			<h1>We couldn't find that page 😖</h1>
			<Link to='/'>Return to homepage</Link>
		</div>
	)
}
