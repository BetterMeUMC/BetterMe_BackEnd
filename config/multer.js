const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
    // 확장자 필터링
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
        cb(null, false);
    }
};


const storage = multer.diskStorage({
        //폴더위치 지정
        destination:(req, file, cb) => {
            //cb(null,"C:\\Better_Me/images");
            cb(null, "/home/ubuntu/BetterMe_BackEnd/images");
        },
        filename:(req, file, cb) => {
            const ext = path.extname(req.file.originalname);
            cb(null, path.basename(req.file.originalname, ext) + Date.now() + ext);
        },

        fileFilter : {fileFilter},

        limits: { fileSize: 30 * 1024 * 1024 },
});

const upload = multer({storage: storage});
module.exports =  upload  ;