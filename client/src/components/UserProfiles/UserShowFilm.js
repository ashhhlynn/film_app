import React from 'react';
import { Header, Item, Label, Divider, Rating } from 'semantic-ui-react';
import FilmModal from '../SearchFilms/FilmModal';

const UserShowFilm = ({ movie }) => {
    return (
        <>
        <Item style={{
            marginLeft:"3%", 
            marginRight:"-58%"
        }}>
            <Header floated="left" style={{marginLeft:".5%"}}>
                <Label style={{
                    marginTop:"20%", 
                    backgroundColor:"#f4f4ff", 
                    color:"black"
                }}>
                    {movie.created_at.slice(0,4)}
                    <h2><b>{movie.created_at.slice(5,10)}</b></h2>
                </Label>
            </Header>
            <FilmModal film={movie} />
            <Item style={{ 
                marginLeft:"27%", 
                marginBottom:"5.25%", 
                marginTop:"-9%", 
                textAlign:"left"
            }}>
                <h3>
                    {movie.title}
                    <Label as="p" style={{
                        background:"none", 
                        fontWeight:"normal", 
                        marginTop:"-2%",
                        color:"white"
                    }}>
                        {movie.year}
                    </Label>
                    <br/>
                    <Rating 
                        className="stars" 
                        rating={movie.rating} 
                        disabled maxRating={5} 
                    />
                </h3>
            </Item>
            <Divider style={{marginLeft:"-1.2%"}} />
        </Item>
        </>
    );
};

export default UserShowFilm;