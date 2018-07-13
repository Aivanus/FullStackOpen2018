import React from 'react'

const Contact = ({ person }) => <p>{person.name}: {person.number}</p>

const Contacts = ({ persons }) => persons.map(
    person => <Contact key={person.name} person={person} />
)

export default Contacts