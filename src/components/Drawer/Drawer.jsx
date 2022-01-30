import React from 'react';

const Drawer = ({ onCloseCart, items = [] }) => {
    return (
      <div  className='overlay'>
        <div className='drawer'>
        <h2 className='mb-30'>Корзина
          <img onClick={onCloseCart} className='removeBtn' src="img/close.svg" alt="Remove" />
        </h2>
        <div className="items">
         {items.map((date) => (
            <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: `url(${date.images})` }} 
            className="cartItemImg">
            </div>
            <div className='mr-20 flex'>
              <p className='mb-5'>{date.title}</p>
              <b>{date.price} руб.</b>
            </div>
            <img className='removeBtn' src="img/close.svg" alt="Remove" />
          </div>
           ))}
        </div>
        <div className="cartTotalBlock">
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
            <img src="img/arrow.svg" alt="" />
          </button>
        </div>
      </div>
      </div>
    );
};

export default Drawer;