import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [cartOpened, setCartOpened] = useState(false)

	// Add items/card/fvo from back end
	useEffect(() => {
		axios.get('https://61f9849d69307000176f72dd.mockapi.io/items').then(res => {
			setItems(res.data)
		})
		axios.get('https://61f9849d69307000176f72dd.mockapi.io/cart').then(res => {
			setCartItems(res.data)
		})
		axios
			.get('https://61f9849d69307000176f72dd.mockapi.io/favorites')
			.then(res => {
				setCartItems(res.data)
			})
	}, [])

	// Add card to Drawer
	const onAddToCart = obj => {
		axios.post('https://61f9849d69307000176f72dd.mockapi.io/cart', obj)
		setCartItems(prev => [...prev, obj])
	}
	// Add to Favorite Card
	const onAddToFavorite = async obj => {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				axios.delete(
					`https://61f9849d69307000176f72dd.mockapi.io/favorites/${obj.id}`
				)
				setFavorites(prev =>
					prev.filter(item => Number(item.id) !== Number(obj.id))
				)
			} else {
				const { data } = await axios.post(
					'https://61f9849d69307000176f72dd.mockapi.io/favorites',
					obj
				)
				setFavorites(prev => [...prev, data])
			}
		}

		// Remove Card from Drawer
	const onRemoveItem = id => {
		axios.delete(`https://61f9849d69307000176f72dd.mockapi.io/cart/${id}`)
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

			<Route path='/' exact>
				<Home
					items={items}
					searchValue={searchValue}
					clearInput={clearInput}
					onAddToCart={onAddToCart}
					onAddToFavorite={onAddToFavorite}
					onChangeSearchInput={onChangeSearchInput}
				/>
			</Route>

			<Route path='/favorites' exact>
				<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
			</Route>
		</div>
	)
}

export default App
