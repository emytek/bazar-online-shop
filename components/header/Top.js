import React, { useState } from "react";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import styles from "./styles.module.scss";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

export default function Top({ country }) {
  //const [loggedIn, setLoggedIn] = useState(true);
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);
  console.log(session, "Session::");

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img
              // src="https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg"
              src={country.flag}
              alt=""
            />
            <span>{country.name}</span>
          </li>

          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection..</span>
          </li>

          <li className={styles.li}>
            <span>Customer Service</span>
          </li>

          <li className={styles.li}>
            <span>Help</span>
          </li>

          <li className={styles.li}>
            <BsSuitHeart />
            <span>Wishlist</span>
          </li>

          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img
                    //src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
                    src={session.user.image}
                    alt=""
                  />
                  {/* <RiAccountPinCircleLine /> */}
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
}
