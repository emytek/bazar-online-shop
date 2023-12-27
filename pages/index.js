import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import Main from "../components/home/main";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "../data/home";
import { useMediaQuery } from "react-responsive";
import FlashDeals from "../components/home/flashDeals";
import ProductsSwiper from "../components/productSwiper";
import Category from "../components/home/category";

export default function Home({ country }) {
  console.log(country, "country data");
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <div className={styles.container}>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper products={gamingSwiper} header="For Gamers" />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvements"
            bg=""
          />
        </div>
      </div>
      <Footer country={country} />
    </div>
  );
}

export async function getServerSideProps() {
  // db.connectDb();
  // let products = await Product.find().sort({ createdAt: -1 }).lean();
  let data = await axios
    .get("https://api.ipregistry.co/?key=rwrvftuy187zjhj4")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(data, "Data ::");
  return {
    props: {
      country: {
        // name: data.name,
        // flag: data.flag.emojitwo,
        name: "Nigeria",
        flag: "https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg",
      },
    },
  };
}
