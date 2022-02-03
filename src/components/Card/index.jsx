import React from 'react'
import ContentLoader from 'react-content-loader'

import AppContext from '../../context'

import styles from './Card.module.scss'

function Card({
	id,
	title,
<<<<<<< HEAD
	images,
=======
	imageUrl,
>>>>>>> 49c79f2 (finish project)
	price,
	onFavorite,
	onPlus,
	favorited = false,
	loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext)
	const [isFavorite, setIsFavorite] = React.useState(favorited)
<<<<<<< HEAD

	const onClickPlus = () => {
		onPlus({ id, title, images, price })
	}

	const onClickFavorite = () => {
		onFavorite({ id, title, images, price })
=======
	const obj = { id, parentId: id, title, imageUrl, price }

	const onClickPlus = () => {
		onPlus(obj)
	}

	const onClickFavorite = () => {
		onFavorite(obj)
>>>>>>> 49c79f2 (finish project)
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={155}
					height={250}
					viewBox='0 0 155 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
					<rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
					<rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
					<rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
<<<<<<< HEAD
					<div className={styles.favorite} onClick={onClickFavorite}>
						<img
							src={isFavorite ? '/img/heart.svg' : '/img/unhearted.svg'}
							alt='Unliked'
						/>
					</div>
					<img width='100%' height={135} src={images} alt='Sneakers' />
=======
					{onFavorite && (
						<div className={styles.favorite} onClick={onClickFavorite}>
							<img
								src={isFavorite ? '/img/heart.svg' : '/img/unhearted.svg'}
								alt='Unliked'
							/>
						</div>
					)}
					<img width='100%' height={135} src={imageUrl} alt='Sneakers' />
>>>>>>> 49c79f2 (finish project)
					<h5>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
<<<<<<< HEAD
						<img
							className={styles.plus}
							onClick={onClickPlus}
							src={
								isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'
							}
							alt='Plus'
						/>
=======
						{onPlus && (
							<img
								className={styles.plus}
								onClick={onClickPlus}
								src={
									isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'
								}
								alt='Plus'
							/>
						)}
>>>>>>> 49c79f2 (finish project)
					</div>
				</>
			)}
		</div>
	)
}

export default Card
