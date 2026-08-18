import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["jobseeker", "employer"],
            required: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        resume: {
            type: String,
            default: "",
        },

        companyName: {
            type: String,
            default: "",
        },

        companyDescription: {
            type: String,
            default: "",
        },

        companyLogo: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Match entered password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

export const User = mongoose.model("User", userSchema);