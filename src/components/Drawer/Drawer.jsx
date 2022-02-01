import React from 'react'

const Drawer = ({ onCloseCart, onRemove, items = [] }) => {
	return (
		<div className='overlay'>
			<div className='drawer'>
				<h2 className='mb-30'>
					Корзина
					<img
						onClick={onCloseCart}
						className='removeBtn'
						src='img/close.svg'
						alt='Remove'
					/>
				</h2>

				{items.length > 0 ? (
					<div>
						<div className='items'>
							{items.map((obj, index) => (
								<div className='cartItem d-flex align-center mb-20' key={index}>
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
							<button className='greenButton'>
								Оформить заказ
								<img src='img/arrow.svg' alt='' />
							</button>
						</div>
					</div>
				) : (
					<div className='cartEmpty d-flex align-center justify-center flex-column flex'>
						<img
							className='mb-20'
							width='120px'
							height='120px'
							src='img/empty.jpg'
							alt='Empty'
						/>
						<h2>Корзина пустая</h2>
						<p className='opacity-6'>
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button onClick={onCloseCart} className='greenButton'>
							<img src='img/arrow.svg' alt='arrow' /> Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Drawer
