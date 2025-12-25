import { Request, Response, NextFunction } from "express"
import { APIErrorCommon } from "../types/Error.js"


const error: APIErrorCommon = {
    failed: true,
    code: "BAD_IMAGE_DATA"
}

async function checkImage(url: string): Promise<boolean> {
    if(!URL.canParse(url)) {
        return false
    }

    const res = await fetch(url);
    const buff = await res.blob();
    
    return buff.type.startsWith('image/')
}

// Middleware za proveru image_url
export const badImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const img_url: string = req.body.image_url;

    const valid = await checkImage(img_url)

    if(!valid) {
        return res.status(400).json(error); // ako je img_url nevalidan
    }

    next(); // Nastavljamo dalje
}