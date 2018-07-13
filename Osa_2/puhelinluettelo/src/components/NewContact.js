import React from 'react'

const NewContact = ({ state, handleSubmit, handleChangeName, handleChangeNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                nimi: <input
                    value={state.newName}
                    onChange={handleChangeName}
                />
            </div>
            <div>
                numero: <input
                    value={state.newNumber}
                    onChange={handleChangeNumber}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default NewContact