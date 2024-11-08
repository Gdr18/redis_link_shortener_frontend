import { Component } from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default class Urls extends Component {
	constructor() {
		super()

		this.state = {
			urls: [],
			isLoading: 1,
			timeoutAlert: null,
			abortController: new AbortController()
		}
	}

	componentDidMount() {
		const timeoutAlert = setTimeout(() => {
			alert('La primera solicitud tarda en cargar, por favor, ten paciencia 🙏')
		}, 2000)

		this.setState({ timeoutAlert })

		fetch(`${import.meta.env.VITE_BACKEND_URL}/urls`, {
			method: 'GET',
			signal: this.state.abortController.signal
		})
			.then(res => res.json())
			.then(response => {
				clearTimeout(this.state.timeoutAlert)
				this.setState({ urls: response, isLoading: 0 })
			})
			.catch(error => {
				clearTimeout(this.state.timeoutAlert)
				console.log('error getting urls', error)
				this.setState({ isLoading: 2 })
			})
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeoutAlert)
		this.state.abortController.abort()
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
						title={`https://url-shortener-frontend-6tel.onrender.com/${Object.keys(
							item
						)}`}
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
					this.state.isLoading === 1 ? 'centering-spinner' : 'links-container'
				}
			>
				{this.state.isLoading === 1 ? (
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
						{this.state.urls.length ? (
							this.urlsItems()
						) : this.state.isLoading === 0 ? (
							<h2>Oops! The list is empty...</h2>
						) : this.state.isLoading === 2 ? (
							<h2>Oops! There was an error...</h2>
						) : null}
					</ol>
				)}
			</div>
		)
	}
}
