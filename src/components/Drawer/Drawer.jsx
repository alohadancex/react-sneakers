import React, { useState } from 'react'
import AppContext from '../../context'
import Info from '../Info'
import axios from 'axios'

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

const Drawer = ({ onCloseCart, onRemove, items = [] }) => {
	const { cartItems, setCartItems } = React.useContext(AppContext)
	const [isOrderComplete, setIsOrderComplete] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [orderId, setOrderId] = useState(null)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				'https://61f9849d69307000176f72dd.mockapi.io/orders',
				{
					items: cartItems,
				}
			)
			setOrderId(data.id)
			setIsOrderComplete(true)
			setCartItems([])

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i]
				await axios.delete(
					'https://61f9849d69307000176f72dd.mockapi.io/cart/' + item.id
				)
				await delay()
			}
		} catch (error) {
			alert('Не удалось оформить заказ :(')
		}
		setIsLoading(false)
	}

	return (
		<div className='overlay'>
			<div className='drawer'>
				<h2 className='mb-30 d-flex justify-between'>
					Корзина
					<img
						onClick={() => onCloseCart}
						className='removeBtn'
						src='img/close.svg'
						alt='Remove'
					/>
				</h2>

				{items.length > 0 ? (
					<div>
						<div className='items'>
							{items.map(obj => (
								<div
									className='cartItem d-flex align-center mb-20'
									key={obj.id}
								>
									<div
										style={{ backgroundImage: `url(${obj.images})` }}
										className='cartItemImg'
									></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className='removeBtn'
										src='img/close.svg'
										alt='Remove'
									/>
								</div>
							))}
						</div>

						<div className='cartTotalBlock'>
							<ul>
								<li>
									<span>Итого: </span>
									<div></div>
									<b>21 498 руб.</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>1074 руб .</b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className='greenButton'
							>
								Оформить заказ
								<img src='img/arrow.svg' alt='' />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						images={
							isOrderComplete ? 'img/complete-order.png' : 'img/arrow.svg'
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
