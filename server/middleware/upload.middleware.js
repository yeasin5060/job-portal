import multer from "multer";
import path from "path";
import os from "os";

// On Vercel / serverless environment, filesystem is read-only except /tmp
export const uploadDir = process.env.VERCEL
    ? path.join(os.tmpdir(), "uploads")
    : path.join(process.cwd(), "uploads");

// uploads folder না থাকলে তৈরি করবে
try {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (error) {
    console.warn("Could not create uploads directory:", error.message);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
        } catch (err) {
            console.warn("Could not create uploads directory in destination:", err.message);
        }
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}${ext}`;

        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedType = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf"
    ];

    if (allowedType.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Only .jpeg, .png, .jpg, .pdf formats are allowed"),
            false
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
});

export { upload };