export function OutputMsg(type: number, message: string) {
    let curDate = new Date();
    if (type == 1) {
        console.log(`\x1b[36m[${new Date(curDate.getTime() - (curDate.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}] [INFO] ${message}\x1b[0m\r`);
    } else if (type == 2) {
        console.log(`\x1b[32m[${new Date(curDate.getTime() - (curDate.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}] [SYSTEM] ${message}\x1b[0m\r`);
    } else if (type == 3) {
        console.log(`\x1b[31m[${new Date(curDate.getTime() - (curDate.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}] [ERROR] ${message}\x1b[0m\r`);
    } else if (type == 4) {
        console.log(`\x1b[33m[${new Date(curDate.getTime() - (curDate.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '')}] [WARNING] ${message}\x1b[0m\r`);
    }
}