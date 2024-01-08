import { createRouter } from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
//import auth from "../../../middleware/auth";
const router = createRouter();

// router.use(auth);

router.post(async (req, res) => {
  try {
    db.connectDb();
    const { address, user_id } = req.body;
    const user = User.findById(user_id);
    await user.updateOne({
      $push: {
        address: address,
      },
    });
    db.disconnectDb();
    return res.json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();
