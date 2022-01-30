import React, { useEffect, useState } from 'react';
import Card from './components/Card/Card'
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';

// const data = [
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": "12 999",
//     "_id": "ew13",
//     "images": "img/sneakers/sneakers.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Air Max 270",
//     "price": "12 999",
//     "_id": "ew14",
//     "images": "img/sneakers/sneakers2.jpg"
//   },
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": "8 999",
//     "_id": "ew15",
//     "images": "img/sneakers/sneakers3.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": "9 999",
//     "_id": "ew16",
//     "images": "img/sneakers/sneakers4.jpg"
//   },
// ];

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);


  // Add card from back end
  useEffect(() => {
    fetch('https://61f6b7f62e1d7e0017fd6f16.mockapi.io/items')
    .then(res => {
      return res.json();
      })
      .then(json => {
        setItems(json)
   })
  }, [])

  // Add card to Drawer
const onAddToCart = (obj) => {
  setCartItems( prev => [ ...prev, obj] );
};

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer  items={cartItems} onCloseCart={() => setCartOpened(false)}/>}
      <Header 
      onClickCart={() => setCartOpened(true)} 
      />
      <div className='content p-40'>
        <div className='d-flex align-center mb-40 justify-between'>
          <h1 className=''>Все кроссовки</h1>
          <div className='search-block d-flex'>
            <img src="img/search.svg" alt="Search" />
            <input placeholder='Поиск...' />
          </div>
        </div>
        <div className='d-flex flex-wrap'>
          {/* CardComponents */}
          {items.map((date => 
            <Card
            title={date.title}
            price={date.price}
            images={date.images}
            key={date._id}
            onPlus={(obj) => onAddToCart(date)}
            onFavorit={() => console.log('add')}
            />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
