const multer = require("multer");
const path = require("path");

// 1. Bikin DiskStorage
// tentuin destination + tentuin filename

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        const randomFileName = file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        cb(null, randomFileName)
    }
})


const multerMiddleware = multer({storage: diskStorage}).single("image");

module.exports = multerMiddleware;