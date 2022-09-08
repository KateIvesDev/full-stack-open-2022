
import React from 'react'

const Filter = ( {searchName, handleFilter} ) => {
    
    return (
    <div>Filter by name: <input
        value={searchName}
        onChange={handleFilter}
        />
    </div>
    )

}

export default Filter


