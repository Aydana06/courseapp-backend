import mongoose, { Schema } from "mongoose";
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
});
export default mongoose.model("Cart", CartSchema);
