import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");

// uploads folder না থাকলে তৈরি করবে
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
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