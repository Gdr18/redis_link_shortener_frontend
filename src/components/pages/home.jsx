import React, { Component } from 'react'

import { MutatingDots } from 'react-loader-spinner'
import CrossIcon from '../icono/cross-icon'

export default class Home extends Component {
	constructor() {
		super()

		this.state = {
			urlOriginal: '',
			urlAcortada: '',
			submit: false,
			isLoading: false
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
			submit: false,
			isLoading: true
		})

		fetch('https://url-shortener-backend-5rxc.onrender.com/url', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ urlOriginal: this.state.urlOriginal })
		})
			.then(res => res.json())
			.then(response =>
				this.setState({
					urlAcortada: response.urlAcortada
				})
			)
			.catch(err => console.error(err))
			.finally(() =>
				this.setState({
					isLoading: false,
					submit: true
				})
			)
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
						<a href={this.state.urlOriginal} target='_blank' rel='noreferrer'>
							http://localhost:8080/url/{this.state.urlAcortada}
						</a>
					</span>
				) : null}
			</form>
		)
	}
}
