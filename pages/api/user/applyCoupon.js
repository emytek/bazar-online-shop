import { createRouter } from "next-connect";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import Cart from "../../../models/Cart";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";

const router = createRouter();

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { coupon, user_id } = req.body;
    const user = User.findById(user_id);
    const checkCoupon = await Coupon.findOne({ coupon });
    if (checkCoupon == null) {
      return res.json({ message: "Invalid coupon" });
    }
    const cartData = await Cart.findOne({ user_id });

    if (
      !cartData ||
      cartData.cartTotal === null ||
      cartData.cartTotal === undefined
    ) {
      return res.json({
        message: "Cart not found or cartTotal is null/undefined",
      });
    }
    const { cartTotal } = cartData;

    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

    res.json({
      totalAfterDiscount: totalAfterDiscount.toFixed(2),
      discount: checkCoupon.discount,
    });

    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
