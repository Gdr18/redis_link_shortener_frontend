import { Component } from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default class Urls extends Component {
	constructor() {
		super()

		this.state = {
			urls: [],
			isLoading: false
		}
	}

	componentDidMount() {
		this.setState({ isLoading: true })

		const timeoutAlert = setTimeout(() => {
			alert('La primera solicitud tarda en cargar, por favor, ten paciencia 🙏')
		}, 4000)

		fetch(`${import.meta.env.VITE_BACKEND_URL}/urls`, {
			method: 'GET'
		})
			.then(res => res.json())
			.then(response => {
				clearTimeout(timeoutAlert)
				this.setState({ urls: response, isLoading: false })
			})
			.catch(error => console.log('error getting urls', error))
	}

	urlsItems() {
		return this.state.urls.map(item => {
			return (
				<li
					key={Object.keys(item)}
					className='links-wrapper'
					title={Object.values(item)}
				>
					{Object.values(item)}
					<a
						href={Object.values(item)}
						title={`https://url-shortener-frontend-6tel.onrender.com/${Object.keys(item)}`}
						target='_blank'
						rel='noreferrer'
					>
						https://url-shortener-frontend-6tel.onrender.com/{Object.keys(item)}
					</a>
				</li>
			)
		})
	}

	render() {
		return (
			<div
				className={
					this.state.isLoading ? 'centering-spinner' : 'links-container'
				}
			>
				{this.state.isLoading ? (
					<MutatingDots
						height='100'
						width='100'
						color='#2eb5be'
						secondaryColor='#6ddfe7'
						radius='12.5'
						ariaLabel='mutating-dots-loading'
						wrapperClass='centering-spinner'
					/>
				) : (
					<ol className='urls-list'>
						{this.state.urls.length ? null : (
							<h2>Oops! The list is empty...</h2>
						)}
						{this.urlsItems()}
					</ol>
				)}
			</div>
		)
	}
}
