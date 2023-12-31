import React from "react";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import Empty from "../components/cart/empty";
import { useSelector } from "react-redux";
import Product from "../components/cart/product";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";

export default function cart() {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <>
      <Header />
      <div className={styles.cart}>
        <div className={styles.cart__container}>
          {cart.cartItems.length > 1 ? (
            <div className={styles.cart__container}>
              <CartHeader
                cartItems={cart.cartItems}
                // selected={selected}
                // setSelected={setSelected}
              />
              <div className={styles.cart__product}>
                {cart.cartItems.map((product) => (
                  <Product product={product} key={product._uid} />
                ))}
              </div>
              <Checkout
                subtotal="5458"
                shippingFee=""
                total="5458"
                selected={[]}
              />
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
}
