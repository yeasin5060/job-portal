import multer from "multer";

const storage = multer.diskStorage({
    destination : (req , file , cd) => {
        cd(null , 'uploads/');
    },
    filename : (req , file , cd) => {
        cd(null, `${new Date()}-${file.originalname}`);
    }
})

const fileFilter = (req, file , cd) => {
    const allowedType = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

    if(allowedType.includes(file.mimetype)) {
        cd(null , true);
    }else {
        cd(new Error('only .jpeg .png .jpg .pdf format allowed'), false);
    }
}

const upload = multer({storage , fileFilter});

export {upload}