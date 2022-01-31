import React, { useEffect, useState } from 'react'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'

function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [cartOpened, setCartOpened] = useState(false)

	// Add card from back end
	useEffect(() => {
		fetch('https://61f6b7f62e1d7e0017fd6f16.mockapi.io/items')
			.then(res => {
				return res.json()
			})
			.then(json => {
				setItems(json)
			})
	}, [])

	// Add card to Drawer
	const onAddToCart = obj => {
		setCartItems(prev => [...prev, obj])
	}

	const onRemoveItem = id => {
		setCartItems(prev => prev.filter(item => item.id !== id))
	}

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}

	const clearInput = () => {
		setSearchValue('')
	}

	return (
		<div className='wrapper clear'>
			{cartOpened && (
				<Drawer
					items={cartItems}
					onCloseCart={() => setCartOpened(false)}
					onRemove={onRemoveItem}
				/>
			)}
			<Header onClickCart={() => setCartOpened(true)} />
			<div className='content p-40'>
				<div className='d-flex align-center mb-40 justify-between'>
					<h1 className=''>
						{searchValue
							? `Поиск по запросу: "${searchValue}"`
							: 'Все кроссовки'}
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
						.map(date => (
							<Card
								title={date.title}
								price={date.price}
								images={date.images}
								key={date._id}
								onPlus={obj => onAddToCart(date)}
								onFavorit={() => console.log('add')}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default App
