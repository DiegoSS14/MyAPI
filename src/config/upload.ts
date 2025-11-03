import multer, { StorageEngine } from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from 'url'

interface uploadConfig {
    directory: string
    storage: StorageEngine
}

// __dirname is not available when running as an ES module. Use import.meta.url to derive it.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadFolder = path.resolve(__dirname, '../..', 'uploads')

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(10).toString('hex')
            const fileName = `${fileHash}_${file.originalname}`
            callback(null, fileName)
        }
    })
} as uploadConfig
