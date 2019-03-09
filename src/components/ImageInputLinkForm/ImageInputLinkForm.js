import React from 'react';
import './ImageInputLinkForm.css';

const ImageInputLinkForm = ({onInputChange, onPictureSubmit}) => {
	return (
<div>
	<p className ='f3 center'>
	{'This Magic App will detect faces in your pictures. Give it a try'}
	</p>
	<div className='center'>
		<div className='form center pa3 br3 shadow-5'>
			<input 
			onChange={onInputChange}
			className='f4 pa w-70 center' type='text' />
			<button 
			onClick={onPictureSubmit}
			className='w-30 grow f4 link ph3 pv2 dib white bg-black'>Detect</button>
		</div>
	</div>
</div>

		);
}

export default ImageInputLinkForm;