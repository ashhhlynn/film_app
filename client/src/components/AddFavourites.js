import React from 'react';
import {  Icon, Button, Divider } from 'semantic-ui-react';

const AddFavourites = () => {
	return (
		<>
			<Button floated="right" basic ><center><Icon name="add"/></center>
				<path
					fill-rule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</Button>
			
		</>
	);
};

export default AddFavourites;