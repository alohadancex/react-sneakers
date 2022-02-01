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

	// Add card from back end
	useEffect(() => {
		axios.get('https://61f6b7f62e1d7e0017fd6f16.mockapi.io/items').then(res => {
			setItems(res.data)
		})
		axios.get('https://61f6b7f62e1d7e0017fd6f16.mockapi.io/cart').then(res => {
			setCartItems(res.data)
		})
		axios
			.get('https://61f6b7f62e1d7e0017fd6f16.mockapi.io/favorites')
			.then(res => {
				setCartItems(res.data)
			})
	}, [])

	// Add card to Drawer
	const onAddToCart = obj => {
		axios.post('https://61f6b7f62e1d7e0017fd6f16.mockapi.io/cart', obj)
		setCartItems(prev => [...prev, obj])
	}

	const onAddToFavorite = async obj => {
		try {
			if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
				axios.delete(
					`https://60d62397943aa60017768e77.mockapi.io/favorites/${obj.id}`
				)
				setFavorites(prev =>
					prev.filter(item => Number(item.id) !== Number(obj.id))
				)
			} else {
				const { data } = await axios.post(
					'https://60d62397943aa60017768e77.mockapi.io/favorites',
					obj
				)
				setFavorites(prev => [...prev, data])
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты')
			console.error(error)
		}
	}

	const onRemoveItem = id => {
		axios.delete(`https://61f6b7f62e1d7e0017fd6f16.mockapi.io/cart/${id}`)
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
