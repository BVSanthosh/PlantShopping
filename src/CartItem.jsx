import React from 'react';
import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => {
        const numericCost = parseFloat(item.cost.replace(/[^0-9.-]+/g, '')); 
        const itemCost = numericCost * item.quantity; 
        totalAmount += itemCost; 
    });
    return totalAmount;
};

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    const cartItem = cart.find(cartItem => cartItem.name === item.name);
    dispatch(updateQuantity({ name: cartItem.name, quantity: cartItem.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    const cartItem = cart.find(cartItem => cartItem.name === item.name);
    if (cartItem.quantity === 1) {
        dispatch(removeItem(cartItem.name));
    } else {
        dispatch(updateQuantity({ name: cartItem.name, quantity: cartItem.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace(/[^0-9.-]+/g, ''));
    return numericCost * item.quantity;
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
