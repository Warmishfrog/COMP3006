import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: false,        
    }
);

const Account = mongoose.model('Account', accountSchema);
export default Account;