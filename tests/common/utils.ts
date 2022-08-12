import dayjs from "dayjs";

const yesterday = dayjs().subtract(1, "d").format("YYYY-MM-DD");
const yesterdayDB = dayjs().subtract(1, "d").format("YYYYMMDD");
const today = dayjs().subtract(0, "d").format("YYYYMMDDHHmmss");

function replaceK(data:string):String {
    return data.replace('ID. ', '').replace('개', '').replace('건', '').replace(/,/gi, '').replace('원', '').trim();
}
export {
    yesterday,
    yesterdayDB,
    replaceK,
    today
}