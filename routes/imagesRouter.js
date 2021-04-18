const router = require('express').Router()
const authMiddleWare = require('../middlewares/auth.middleware.js')
const images = require('../controllers/imagesController')
const multer = require('multer')
const path = require('path')
const mime = require('mime')
const crypto = require('crypto')
const { check } = require('express-validator')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //каталог для хранения изображений
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    const id = crypto.createHash('md5').update(file.originalname + file.size, 'utf8').digest('hex')
    const ext = mime.getExtension(file.mimetype)
    cb(null, `${id}.${ext}`)
  }
})

//Проверка загружаемых файлов
const fileFilter = (req, file, cb) => {
  //типы изображений
  const filetypes = /jpeg|jpg|png|gif|svg/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post(
  '/',
  [check('Authorization', 'Токен отсутствует').notEmpty()],
  authMiddleWare,
  //в array указываем имя поля input type=file из формы
  multer({ storage: storage, fileFilter: fileFilter }).array('images'),
  images.upload,
)

module.exports = router