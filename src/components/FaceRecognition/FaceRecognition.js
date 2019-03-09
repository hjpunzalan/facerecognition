import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {

	return (
	<div className='center'>
		<div className='absolute mt5'>
			<img 
			className='shadow-5 ' 
			id='inputimage' 
			alt='Insert correct URL' 
			src={imageUrl} 
			style={{position:'relative', maxWidth: 300, height: 'auto'}} />
			{Object.values(box).map((face, i) => {
				return <div 
				className='bounding-box'
				key={i}
				style={{
				top: face.topRow,
				right: face.rightCol,
				bottom: face.bottomRow,
				left:face.leftCol}}>
				</div>})}

			</div>
	</div>

		);
}

export default FaceRecognition;