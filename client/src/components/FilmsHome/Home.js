import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import WelcomeFilms from './WelcomeFilms';
import Feed from './Feed';
import SearchBox from './SearchBox';

const Home = (props) => {
    const [welcomeMovies, setWelcomeMovies] = useState([]);

    useEffect(() => {
        getWelcomeMovies()
    }, []);

    const getWelcomeMovies = () => {
        fetch("/diary_films")
        .then((response) => response.json())
        .then(data => {
            setWelcomeMovies(data.slice(0,7))
        })  
    };
    
    return (
        <div className="home">
            <h3 style={{
                marginTop:"3.8%",
                marginLeft:"-2%",
                marginBottom:"2.6%"
            }}>
                <center>
                    <SearchBox />
                </center>
            </h3>
            <Divider />
            <h3 style={{
                marginTop:"3.6%", 
                marginBottom:"-.65%"
            }}>
                New on Boxd
            </h3>
            {welcomeMovies.length !== 0 ?
                <>
                <WelcomeFilms welcomeMovies={welcomeMovies} />
                <Divider />
                </>
            :
                <p>No new content on Boxd right now.</p>
            }
            <h3 style={{
                marginBottom:"-1.5%", 
                marginTop:"3.5%"
            }}>
                New from Friends
            </h3>
            {props.currentUser.length === 0 ?
                <p>Register or log in (demo login available) to rate films, add to a watchlist, and view friend activity!</p>
            :
                <>
                {props.feed.length !== 0 ?
                    <>      
                    <Feed feed={props.feed} />
                    <Divider /> 
                    </>
                :
                    <p>No new content from friends right now.</p>
                }
                </>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return { 
        feed: state.feed
    }
};

export default connect(mapStateToProps)(Home);