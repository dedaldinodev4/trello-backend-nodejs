import { Schema, model } from "mongoose";
import validator from 'validator'
import { hashSync, compareSync } from 'bcrypt'
import { UserDocument } from '../dtos/User';

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, "Invalid email"],
        createIndexes: { unique: true }
    },
    username: {
        type: String, 
        required: [true, 'Username is required']
    },
    password: {
        type: String, 
        required: [true, 'Password is required'],
        select: false
    },

}, 
{
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await hashSync(this.password, 10);
        return next();
    } catch(err) {
        return next(err as Error)
    }
})

userSchema.methods.validatePassword = function(password: string) {
    return compareSync(password, this.password);
}


export default model<UserDocument>("User", userSchema);

