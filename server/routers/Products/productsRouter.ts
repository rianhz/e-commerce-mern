import express, { Request } from 'express'
import { addProduct, getProduct } from '../../controller/productsActions'
import multer,{FileFilterCallback} from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const productRouter = express.Router()

const fileStorage = multer.diskStorage({
    destination: (req:Request,file:Express.Multer.File,cb:DestinationCallback):void => {
        cb(null,'images')
    },
    filename : (req:Request,file:Express.Multer.File,cb:FileNameCallback):void => {
        cb(null,new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'||file.mimetype === 'image/jpeg'){
        cb(null,true)
    } else{
        cb(null,false)
    }
}
productRouter.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('product_image'))

productRouter.get('/', getProduct)

productRouter.post('/', addProduct)

export default productRouter