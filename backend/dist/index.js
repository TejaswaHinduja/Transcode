"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const upload = (0, multer_1.default)({ dest: "../uploads/" });
app.post("/upload", upload.single("video"), (req, res) => {
    const vid = req.file;
    //@ts-ignore
    console.log(vid.filename);
    res.json({ filename: vid?.filename });
});
app.listen(4000);
//multer used so that we can parse the multipart http request without any headache
//# sourceMappingURL=index.js.map