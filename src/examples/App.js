import React from 'react';
import Wave from '../lib';
import 'antd/dist/antd.css';

export default () => {

	return (
		<div
			style={{
				width: '100%',
				textAlign: 'center',
				margin: '200px auto'
			}}
		>
			<Wave
				color='#2E81F7'
				range={50}
			/>
		</div>
	);
};