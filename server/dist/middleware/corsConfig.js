"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const corsConfig = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header(`Access-Control-Allow-Origin`, `example.com`);
    res.header(`Access-Control-Allow-Methods`, `GET,PATCH,POST,DELETE`);
    next();
};
exports.corsConfig = corsConfig;
//# sourceMappingURL=corsConfig.js.map