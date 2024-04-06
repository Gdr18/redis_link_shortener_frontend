import { Link } from 'react-router-dom'

export default function Navigation() {
	return (
		<div className='barra-links'>
			<Link to='/'>Redis Link Shortener</Link>
			<Link to='/urls' className='all-links'>
				All links
			</Link>
		</div>
	)
}
