import React from 'react';
const Ring = (props) => {
	let { color, width } = props;
	return (
		<div style={{ width: width, height: width, display: 'inline-block' }}>
			<svg
				viewBox="56 18 10 110"
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				<path d="M20,90  A45,45 0 1,1 107,90 A1,1 0 0,1 105.5,88.6 A43,43 0 1,0 21.6,88.5 A1,1 0 0,1 20,90"
					stroke='none'
					fill={color}
					fillOpacity="0.5"
				/>
				<circle cx="10" cy="85" r="2" stroke="none" fill={color} fillOpacity="0.6" strokeOpacity="0.4" />
				<circle cx="113" cy="80" r="2" stroke="none" fill={color} fillOpacity="0.6" strokeOpacity="0.4" />
				<circle cx="110" cy="35" r="5" stroke="none" fill={color} fillOpacity="0.6" strokeOpacity="0.4" />
			</svg>
		</div>
	);
};

export default Ring;
