"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceK = exports.yesterdayDB = exports.yesterday = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const api_url = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/hm/data/sales';
const src = 'okpos';
const yesterday = (0, dayjs_1.default)().subtract(1, "d").format("YYYY-MM-DD");
exports.yesterday = yesterday;
const yesterdayDB = (0, dayjs_1.default)().subtract(1, "d").format("YYYYMMDD");
exports.yesterdayDB = yesterdayDB;
/**
 * 매장, 결재수단 사이트 접속 id/pwd
 * @param {string} onclike, amt, cnt html text 변황
 * @returns {String} cleansing 완료된 value
 */
function replaceK(data) {
    return data.replace('ID. ', '').replace('개', '').replace('건', '').replace(/,/gi, '').replace('원', '').trim();
}
exports.replaceK = replaceK;
//# sourceMappingURL=utils.js.map