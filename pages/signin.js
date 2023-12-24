import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/signin.module.scss";
import LoginInput from "../components/input/loginInput";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CircledIconBtn from "../components/buttons/circledIconBtn";
const initialValues = {
  login_email: "",
  login_password: "",
};

export default function signin() {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user, "Input");
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string()
      .required("Please enter a password")
      .matches(
        /^(?=.*\d).{8,}$/,
        "Password must be at least 8 characters long and contain at least one number."
      ),
  });

  return (
    <div>
      <Header country="https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg" />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best Eshopping services in Africa</p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              //   onSubmit={() => {
              //     signInHandler();
              //   }}
            >
              {(form) => (
                <Form>
                  <input
                    type="hidden"
                    name="csrfToken"
                    // defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {/* {login_error && ( */}
                  {/* <span className={styles.error}>{login_error}</span> */}
                  {/* )} */}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="Nigeria" />
    </div>
  );
}
