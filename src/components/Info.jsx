import React from 'react'
import AppContext from '../context'


const Info = ({ title, description, images }) => {
	const { setCartOpened } = React.useContext(AppContext)
	return (
		<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
			<img
				className='mb-20'
				width='120px'
				src={images}
				alt='Empty'
			/>
			<h2>{title}</h2>
			<p className='opacity-6'>{description}</p>
			<button onClick={() => setCartOpened} className='greenButton'>
				<img src='/img/arrow.svg' alt='arrow' /> Вернуться назад
			</button>
		</div>
	)
}

export default Info