import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { getCart, addCart, updateCartItem, deleteCartItem } from '../api/api';
import AuthContext from './AuthContext';



const initial = { items: [], total: 0, loading: false, error: null };
const CartContext = createContext(initial);

function reducer(state, action){
  switch(action.type){
    case 'LOAD_START': return { ...state, loading: true };
    case 'LOAD_SUCCESS': return { ...state, loading: false, items: action.payload.items, total: action.payload.total };
    case 'LOAD_FAIL': return { ...state, loading: false, error: action.payload };
    default: return state;
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial);
  const { token } = useContext(AuthContext);

  const fetchCart = async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const res = await getCart();
      dispatch({ type: 'LOAD_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOAD_FAIL', payload: err?.response?.data?.error || err.message });
    }
  };

  useEffect(()=>{
    if (token) fetchCart();
    else dispatch({ type: 'LOAD_SUCCESS', payload: { items: [], total: 0 }});
  }, [token]);

  const addToCart = async (productId, qty=1) => { await addCart({ productId, qty }); await fetchCart(); };
  const updateItem = async (id, qty) => { await updateCartItem(id, { qty }); await fetchCart(); };
  const removeItem = async (id) => { await deleteCartItem(id); await fetchCart(); };

  return (
    <CartContext.Provider value={{ ...state, fetchCart, addToCart, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
