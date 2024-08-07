import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'semantic-ui-react';
import FilmModal from '../SearchFilms/FilmModal';

const Watchlist = () => {
    const watchlistFilms = useSelector(state => state.watchlistFilms);

    return (
        <div className="watchlist">
            {watchlistFilms.length === 0 ?
                <p>Your watchlist is empty. Search for a film to begin adding!</p> 
            :
                <Card.Group 
                    itemsPerRow={7}
                    style={{
                        marginTop:"3%", 
                        marginBottom:"-.5%"
                    }} 
                >
                    {watchlistFilms.map((movie) => (
                        <Card key={movie.id}>
                            <FilmModal film={movie} />
                        </Card>
                    ))}
                </Card.Group>
            }
        </div>
    );
};

export default Watchlist;