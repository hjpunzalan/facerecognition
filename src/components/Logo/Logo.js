import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Brain from './Brain.png';


const Logo = () => {
	return (
		<div className="ma4 mt0" style={{marginLeft: '10%'}}>
			<Tilt className="Tilt br2 shadow-2" style={{ maxWidth: '15vh' }}>
			 	<div className="Tilt-inner tc pa3"> <img style={{paddingTop: '5px'}} alt="logo" src={Brain} /> </div>
			</Tilt>
		</div>
		);
}

export default Logo;