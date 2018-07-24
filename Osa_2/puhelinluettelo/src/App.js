import React from 'react';
import Contacts from './components/Contacts'
import NewContact from './components/NewContact'
import contactService from './services/contacts'



class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			persons: [],
			newName: '',
			newNumber: '',
			filter: ''
		}
	}

	componentDidMount() {
		console.log('mount')
		contactService
			.getAll()
			.then(response => {
				this.setState({ persons: response })
			})
	}

	addContact = (event) => {
		event.preventDefault()

		const newPerson = {
			name: this.state.newName,
			number: this.state.newNumber
		}

		if (!this.state.persons.some(person => person.name === newPerson.name)) {
			contactService
				.create(newPerson)
				.then(response => {
					this.setState({
						persons: this.state.persons.concat(response),
						newName: '',
						newNumber: ''
					})
				})
		} else {
			if (window.confirm(newPerson.name + ' on jo luettelossa, korvataanko vanha numero?')) {
				const personToChange = this.state.persons.find(p => p.name === newPerson.name)
				const changedPerson = { ...personToChange, number: newPerson.number }
				contactService
					.update(changedPerson.id, changedPerson)
					.then(response => {
						this.setState({
							persons: this.state.persons.map(p => p.name !== newPerson.name ? p : response),
							newName: '',
							newNumber: ''
						})
					})
			}
		}
	}

	handleNameFieldChange = (event) => {
		this.setState({ newName: event.target.value })
	}

	handleNumberFieldChange = (event) => {
		this.setState({ newNumber: event.target.value })
	}

	handleFilterChange = (event) => {
		this.setState({ filter: event.target.value })
	}

	handleDestroy = (id) => {
		return () => {
			console.log(id)
			if (window.confirm('Oletko varma?')) {
				contactService
					.destroy(id)
					.then(response => {
						this.setState({
							persons: this.state.persons.filter(person => person.id !== id)
						})
					})
			}
		}
	}

	render() {
		const contactsToShow =
			this.state.filter === "" ?
				this.state.persons :
				this.state.persons.filter(
					person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase())
				)

		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<div>
					Rajaa näytettäviä: <input
						value={this.state.filter}
						onChange={this.handleFilterChange}
					/>
				</div>
				<h3>Lisää uusi</h3>
				<NewContact
					state={this.state}
					handleSubmit={this.addContact}
					handleChangeName={this.handleNameFieldChange}
					handleChangeNumber={this.handleNumberFieldChange}
				/>
				<div>
					<h2>Numerot</h2>
					<Contacts persons={contactsToShow} handleDestroy={this.handleDestroy} />
				</div>
			</div>
		)
	}
}

export default App