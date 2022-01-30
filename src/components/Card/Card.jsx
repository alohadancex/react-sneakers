import React, { useState } from 'react';
import styles from './Card.module.scss';

const Card = ( { onPlus, onFavorit, title, images, price } ) => {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, images, price });
    setIsAdded(!isAdded);
  }
    return (
        <div className={styles.card}>
         <div className={styles.favorite} onClick={onFavorit}>
           <img src="img/unhearted.svg" alt="Unliked"/>
           </div>
          <img width="100%" height={135} src={images} alt="Sneakers"/>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
              <img 
              className={styles.plus} 
              onClick={onClickPlus} 
              src={isAdded ? 
                'img/btn-checked.svg' 
                : 
                'img/plus.svg'} 
              alt="plus"/>
            </div>
        </div>
    );
};

export default Card;


