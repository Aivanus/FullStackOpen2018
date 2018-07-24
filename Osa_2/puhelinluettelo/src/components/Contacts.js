import React from 'react'

const Contact = ({ person, handleDestroy }) => {
    return <p>{person.name}: {person.number} <button onClick={handleDestroy}> poista </button></p>
}

const Contacts = ({ persons, handleDestroy }) => persons.map(
    person => <Contact key={person.id} person={person} handleDestroy={handleDestroy(person.id)} />
)

export default Contacts