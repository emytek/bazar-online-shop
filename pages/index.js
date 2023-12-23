import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

export default function Home({ country }) {
  console.log(country, "country data");

  return (
    <div className={styles.container}>
      <Header country={country} />
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
