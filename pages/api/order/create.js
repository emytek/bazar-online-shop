import { createRouter } from "next-connect";
import User from "../../../models/User";
import Order from "../../../models/Order";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const router = createRouter();
// const handler = nc().use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
      user_id,
    } = req.body;
    const user = await User.findById(user_id);
    const newOrder = await new Order({
      user,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();
    db.disconnectDb();
    return res.json({
      order_id: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
