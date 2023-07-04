import React from 'react'
import { Card, Popup, Icon, Image } from 'semantic-ui-react'

const Films = (props) => {

	return (
		<Card.Group itemsPerRow={5}>
			{props.films.map((movie, index) => (
                <Popup flowing hoverable 
                    key={index} 
                    trigger={
				        <Card >
			                <Image style={{height:"300px", width:"220px"}}src={movie.Poster} alt='movie'></Image>		  
				        </Card>		
                    }
                >
                    <div onClick={() => props.handleDiaryClick(movie)}>
                        <Popup.Content>
                            <center><p>Log Film to Diary<Icon floated="right" style={{cursor: "pointer"}} name="add"/></p></center>
                        </Popup.Content>
                    </div>
                </Popup>
			))}
		</Card.Group>
	)
}

export default Films