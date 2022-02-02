import React, {useState, useEffect} from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header/Header'
import Drawer from './components/Drawer/Drawer'
import AppContext from './context'

import Home from './pages/Home'
import Favorites from './pages/Favorites'

function App() {
	const [items, setItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [cartOpened, setCartOpened] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			// TODO: Сделать try catch + Promise.all
			const cartResponse = await axios.get(
				'https://61f9849d69307000176f72dd.mockapi.io/cart'
			)
			const favoritesResponse = await axios.get(
				'https://61f9849d69307000176f72dd.mockapi.io/favorites'
			)
			const itemsResponse = await axios.get(
				'https://61f9849d69307000176f72dd.mockapi.io/items'
			)

			setIsLoading(false)
			setCartItems(cartResponse.data)
			setFavorites(favoritesResponse.data)
			setItems(itemsResponse.data)
		}

		fetchData()
	}, [])

	const onAddToCart = obj => {
		
		if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
			axios.delete(`https://61f9849d69307000176f72dd.mockapi.io/cart/${obj.id}`)
			setCartItems(prev =>
				prev.filter(item => Number(item.id) !== Number(obj.id))
			)
		} else {
			axios.post('https://61f9849d69307000176f72dd.mockapi.io/cart', obj)
			setCartItems(prev => [...prev, obj])
		}
	}

	const onRemoveItem = id => {
		axios.delete(`https://61f9849d69307000176f72dd.mockapi.io/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id !== id))
	}

	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`/favorites/${obj.id}`)
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
		} catch (error) {
			alert('Не удалось добавить в фавориты')
		}
	}

	const onChangeSearchInput = event => {
		setSearchValue(event.target.value)
	}

	const isItemAdded = id => {
		return cartItems.some(obj => Number(obj.id) === Number(id))
	}

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToFavorite,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className='wrapper clear'>
				{cartOpened && (
					<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
					/>
				)}

				<Header onClickCart={() => setCartOpened(true)} />

				<Route path='/' exact>
					<Home
						items={items}
						cartItems={cartItems}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						onChangeSearchInput={onChangeSearchInput}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>
				</Route>

				<Route path='/favorites' exact>
					<Favorites />
				</Route>
			</div>
		</AppContext.Provider>
	)
}

export default App
