import React from 'react'
import Card from '../components/Card/Card'

const Home = ({
	searchValue,
	clearInput,
	onChangeSearchInput,
	items,
	onAddToCart,
	onAddToFavorite,
}) => {
	return (
		<div className='content p-40'>
			<div className='d-flex align-center mb-40 justify-between'>
				<h1 className=''>
					{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
				</h1>
				<div className='search-block d-flex'>
					<img src='img/search.svg' alt='Search' />
					{searchValue && (
						<img
							className='clear removeBtn'
							src='img/close.svg'
							alt='Remove'
							onClick={clearInput}
						/>
					)}
					<input
						value={searchValue}
						placeholder='Поиск...'
						onChange={onChangeSearchInput}
					/>
				</div>
			</div>
			<div className='d-flex flex-wrap'>
				{/* CardComponents */}
				{items
					.filter(item =>
						item.title.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((item, index) => (
						<Card
							key={index}
							onPlus={obj => onAddToCart(obj)}
							onFavorite={obj => onAddToFavorite(item)}
							{...item}
						/>
					))}
			</div>
		</div>
	)
}

export default Home
