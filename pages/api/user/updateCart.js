import { createRouter } from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import db from "../../../utils/db";
// import auth from "";

const router = createRouter();

// router.use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const promises = req.body.products.map(async (p) => {
      let dbProduct = await Product.findById(p._id).lean();
      // p.style==>which exact product
      let originalPrice = dbProduct.subProducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).price;
      let quantity = dbProduct.subProducts[p.style].sizes.find(
        (x) => x.size == p.size
      ).qty;
      let discount = dbProduct.subProducts[p.style].discount;
      return {
        ...p,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount: discount,
        quantity: quantity,
        shippingFee: dbProduct.shipping,
      };
    });

    const data = await Promise.all(promises);
    db.disconnectDb();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
