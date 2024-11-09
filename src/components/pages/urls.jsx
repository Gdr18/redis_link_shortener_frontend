import { Component } from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default class Urls extends Component {
	constructor() {
		super()

		this.state = {
			urls: [],
			loadingStatus: 1,
			timeoutAlert: null,
			abortController: new AbortController()
		}
	}

	componentDidMount() {
		const timeoutAlert = setTimeout(() => {
			alert('The first request takes to load, please, be patient 🙏')
		}, 2000)

		this.setState({ timeoutAlert })

		fetch(`${import.meta.env.VITE_BACKEND_URL}/urls`, {
			method: 'GET',
			signal: this.state.abortController.signal
		})
			.then(res => res.json())
			.then(response => {
				clearTimeout(this.state.timeoutAlert)
				this.setState({ urls: response, loadingStatus: 0 })
			})
			.catch(error => {
				clearTimeout(this.state.timeoutAlert)
				console.log('error getting urls', error)
				this.setState({ loadingStatus: 2 })
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
					this.state.loadingStatus === 1 ? 'centering-spinner' : 'links-container'
				}
			>
				{this.state.loadingStatus === 1 ? (
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
						) : this.state.loadingStatus === 0 ? (
							<h2>Oops! The list is empty...</h2>
						) : this.state.loadingStatus === 2 ? (
							<h2>Oops! There was an error...</h2>
						) : null}
					</ol>
				)}
			</div>
		)
	}
}
