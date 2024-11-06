import { Component } from 'react'

import { MutatingDots } from 'react-loader-spinner'
import CrossIcon from '../icono/cross_icon'

export default class Home extends Component {
	constructor() {
		super()

		this.state = {
			urlOriginal: '',
			urlAcortada: '',
			submit: false,
			isLoading: false,
			timeoutAlert: null,
			abortController: new AbortController()
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})

		if (event.target.value === '') {
			this.setState({
				submit: false
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()

		this.setState({
			isLoading: true
		})

		const timeoutAlert = setTimeout(() => {
			alert('La primera solicitud tarda en cargar, por favor, ten paciencia 🙏')
		}, 2000)

		this.setState({ timeoutAlert })

		fetch(`${import.meta.env.VITE_BACKEND_URL}/url`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ urlOriginal: this.state.urlOriginal }),
			signal: this.state.abortController.signal
		})
			.then(res => res.json())
			.then(response => {
				clearTimeout(this.state.timeoutAlert)
				this.setState({
					urlAcortada: response,
					isLoading: false,
					submit: true
				})
			})
			.catch(err => {
				if (err.name === 'AbortError') {
					console.log('Fetch aborted')
				} else {
					console.log(err)
				}
				clearTimeout(this.state.timeoutAlert)
			})
	}

	componentWillUnmount() {
		clearTimeout(this.state.timeoutAlert)
		this.state.abortController.abort()
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className='input-button'>
				<div className='container-input'>
					<input
						type='url'
						name='urlOriginal'
						required
						onChange={this.handleChange}
						value={this.state.urlOriginal}
					/>
					<span
						className='cross-icon'
						title='Clear'
						onClick={() => this.setState({ urlOriginal: '', submit: false })}
					>
						<CrossIcon />
					</span>
				</div>
				<button>SHORTEN URL</button>

				{this.state.isLoading ? (
					<MutatingDots
						height='100'
						width='100'
						color='#2eb5be'
						secondaryColor='#6ddfe7'
						radius='12.5'
						ariaLabel='mutating-dots-loading'
						wrapperStyle={{ marginTop: '50px' }}
					/>
				) : null}
				{this.state.submit ? (
					<span>
						Your shortened URL is:{' '}
						<a
							href={this.state.urlOriginal}
							title={`https://url-shortener-frontend-6tel.onrender.com/url/${this.state.urlAcortada}`}
							target='_blank'
							rel='noreferrer'
						>
							https://url-shortener-frontend-6tel.onrender.com/
							{this.state.urlAcortada}
						</a>
					</span>
				) : null}
			</form>
		)
	}
}
