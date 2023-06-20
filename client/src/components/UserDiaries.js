import { Header, Image, Button, Item, Icon, Label, Divider } from 'semantic-ui-react'
import UserMovieRating from './UserMovieRating'
import React, { useState, useEffect } from 'react'
import Films from './Films'
import SearchBox from './SearchBox'
import Feed from './Feed'

const UserDiaries = (props) => {
    const [films, setFilms] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const getMovieRequest = async (searchValue) => {
        const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
        const response = await fetch(url)
        const responseJson = await response.json()
        if (responseJson.Search) {
            setFilms(responseJson.Search)
        }
    }
  
    useEffect(() => {
        getMovieRequest(searchValue)
    }, [searchValue])

    

    const [userDiaries, setUserDiaries] = useState([])

    const getUserMovies = () => {
        let id = props.currentUser.id
		fetch(`/users/` + id)
		.then((response) => response.json())
		.then(data => {
	    	console.log(data.diary_films)
	    	setUserDiaries(data.diary_films)
    	})
	}

    useEffect(() => {
		getUserMovies()
	}, [])

	const addUserDiaryFilm = (film) => {
		var today = new Date(),
		date = (today.getMonth() + 1) + '-' + today.getDate()
		fetch("/diary_films", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: film.Title, 
				user_id: props.currentUser.id, 
				watch_date: date,
				year: film.Year, 
				poster: film.Poster, 
				rating: 0, 
			})
		})
		.then((response) => response.json())
		.then(data => {
            const newDiaryList = [...userDiaries, data]
            setUserDiaries(newDiaryList)
		})
	}

    const removeUserDiaryFilm = (film) => {
		console.log(film.id)
		fetch(`/diary_films/` + film.id, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',	
		},
		})
        const newDiaryList = userDiaries.filter(
            (diary) => diary.id !== film.id
        )
        setUserDiaries(newDiaryList)
	}

    const patchRating = (r, id) => {
        fetch(`/diary_films/` + id, {  
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               rating: r
            })
        })
        .then(resp => resp.json())
    }

	return (
		<>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/><br></br>
            <Films
                films={films}
                handleDiaryClick={addUserDiaryFilm}
            />
            <Divider></Divider>
            <Feed/>
            <Divider></Divider>
		    {userDiaries.map((movie, index) => (
			    <Item key={index} style={{marginLeft:"5%", marginRight:"5%"}}>
                    <div onClick={() => removeUserDiaryFilm(movie)}>
                        <Button floated="right" size="mini" style={{width:"40px"}} inverted basic>
                            <Icon size="small" name="delete" />
                        </Button>
				    </div>
                    <Header floated="right" style={{color:"white", textAlign:"right"}}>
                        <h3>{movie.title} </h3>
                        <h5>{movie.year}</h5>
					    <h5><UserMovieRating film={movie} key={movie.id} handleClickPatchRating={patchRating}/></h5>
                    </Header>
                    <Header floated="left"><br></br>
                        <Label style={{ backgroundColor:"#FFFEEF", color:"black"}}>
                            2023
                            <h2 ><b>{movie.watch_date.slice(0,4)}</b></h2>
                        </Label>
                    </Header>
				    <Image style={{height:"110px", width:"75px", marginLeft:"13%", alignContent:"left"}} src={movie.poster} alt='movie'/>
                    <Divider></Divider>
                </Item>
		    ))}
        </>
	)
}

export default UserDiaries