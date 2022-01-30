import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
    return (
        <div className={styles.card}>
         <div className={styles.favorite} onClick={props.onFavorit}>
           <img src="img/unhearted.svg" alt="Unliked"/>
           </div>
          <img width="100%" height={135} src={props.images} alt="Sneakers"/>
          <h5>{props.title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{props.price} руб.</b>
            </div>
            <button className='button' onClick={props.onPlus}>
              <img  width={11} height={11} src="img/plus.svg" alt="plus"/>
              </button>
            </div>
        </div>
    );
};

export default Card;


