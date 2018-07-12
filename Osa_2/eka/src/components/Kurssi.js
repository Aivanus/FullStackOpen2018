import React from 'react'

const Otsikko = (props) => (
    <div>
        <h1>{props.kurssi.nimi}</h1>
    </div>
)

const Sisalto = ({ osat }) => osat.map(osa => <Osa key={osa.id} osa={osa} />)

const Osa = ({ osa }) => (
    <p>{osa.nimi} {osa.tehtavia}</p>
)

const Yhteensa = ({ osat }) => (
    <p>Tehtäviä yhteensä: {osat.reduce((total, osa) => total + osa.tehtavia, 0)}</p>
)

const Kurssi = ({ kurssi }) => (
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto osat={kurssi.osat} />
        <Yhteensa osat={kurssi.osat} />
    </div>
)


export default Kurssi