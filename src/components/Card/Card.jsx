import React, { useState } from 'react'
import styles from './Card.module.scss'

const Card = ({ onPlus, onFavorite, title, images, price, id, favorited = false }) => {
	const [isAdded, setIsAdded] = useState(false)
	const [isFavorite, setIsFavorite] = useState(favorited)

	const onClickPlus = () => {
		onPlus({ title, images, price })
		setIsAdded(!isAdded)
	}

	const onClickFavorite = () => {
		onFavorite({ title, images, price, id })
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			<div className={styles.favorite} onClick={onClickFavorite}>
				<img
					onClick={onFavorite}
					src={isFavorite ? 'img/heart.svg' : 'img/unhearted.svg'}
					alt='unhearted'
				/>
			</div>
			<img width='100%' height={135} src={images} alt='Sneakers' />
			<h5>{title}</h5>
			<div className='d-flex justify-between align-center'>
				<div className='d-flex flex-column'>
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<img
					className={styles.plus}
					onClick={onClickPlus}
					src={isAdded ? 'img/btn-checked.svg' : 'img/plus.svg'}
					alt='plus'
				/>
			</div>
		</div>
	)
}

export default Card
