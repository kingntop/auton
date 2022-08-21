import dayjs from "dayjs";

const yesterday = dayjs().subtract(1, "d").format("YYYY-MM-DD");
const yesterdayDB = dayjs().subtract(1, "d").format("YYYYMMDD");
const today = dayjs().subtract(0, "d").format("YYYYMMDDHHmmss");

function replaceK(data:string):String {
    return data.replace('ID. ', '').replace('개', '').replace('건', '').replace(/,/gi, '').replace('원', '').trim();
}

function errMsg(err:string):string {
    // err.includes('TimeoutError') ? err = 'TimeoutError' : err = err;
    if ( err.includes('invalid URL') ) {
        return '오류 URL:' + err;
    }
    if ( err.includes('page.waitForSelector') ) {
        return 'Element 없음:' + err;
    }
    
    if(err.indexOf('TimeoutError:') > -1) {
        return '시간초과:' + err;
    }
    if ( err.substring( 0, 5) == 'Error' && err.includes('unexpected value') ) {
        return 'Element 없음:' + err;
    }
    return err.toString();
}
export {
    yesterday,
    yesterdayDB,
    replaceK,
    today,
    errMsg
}