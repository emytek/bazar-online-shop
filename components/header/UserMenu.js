import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Router from "next/router";
import { signOut, signIn } from "next-auth/react";

export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Bazar !</h4>
      {session ? (
        <div className={styles.flex}>
          <img
            //src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            src={session.user.image}
            alt=""
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <Link href="/signin">
            <div
              onClick={() => signIn()}
              className={styles.btn_primary}
              role="button"
              tabIndex={0}
            >
              Register
            </div>
          </Link>
          <Link href="/signin">
            <div
              onClick={() => signIn()}
              className={styles.btn_outlined}
              role="button"
              tabIndex={1}
            >
              Login
            </div>
          </Link>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Acount</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  );
}
