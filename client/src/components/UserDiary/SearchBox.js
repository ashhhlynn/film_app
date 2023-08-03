import React, { useState, useEffect } from 'react'
import {  Icon } from 'semantic-ui-react'
import Films from './Films'

const SearchBox = (props) => {
	
    const [searchValue, setSearchValue] = useState('')
    const [films, setFilms] = useState([])
    
    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
        const response = await fetch(url)
        const responseJson = await response.json()
        if (responseJson.Search) {
            setFilms(responseJson.Search)
            console.log(films)
        }
    }

    useEffect(() => {
      getMovieRequest(searchValue)
    }, [searchValue])

	return (
		<>
		<h3 style={{marginTop:"4%"}}> 
			<input style={{letterSpacing:"1px", fontSize:"16px"}} value={props.value} onChange={(event) => setSearchValue(event.target.value)} placeholder='Search films...'/> <Icon name="search" />
        </h3>
		<Films films={films} addUserDiaryFilm={props.addUserDiaryFilm}/>
		</>
	)
}

export default SearchBox