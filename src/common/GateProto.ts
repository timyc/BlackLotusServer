const RUNGATECODE = 0xAA55AA55;
const RUNTEMPCODE = 0XEEFF;
const GM_OPEN = 1;
const GM_CLOSE = 2;
const GM_CHECKSERVER = 3;
const GM_CHECKCLIENT = 4;
const GM_DATA = 5;
const GM_SERVERUSERINDEX = 6;
const GM_APPKEEPALIVE = 7;
const GM_APPKEEPALIVEACK = 8;
const GM_APPBIGPACK = 9;
const GM_GATEUSERINFO = 10;
const GM_CLOSE_SERVER = 0xEEF1;

interface GATEMSGHDR {
    nSocket: number,
    dwGateCode: number,
    wSessionIdx: number,
    wIdent: number,
    wServerIdx: number,
    wTemp: number,
    nDataSize: number,
    tickCount: number
}

interface GATEUSERINFO {
    nGatePort: number,
    nUserCount: number,
}

export { RUNGATECODE, RUNTEMPCODE, GM_OPEN, GM_CLOSE, GM_CHECKSERVER, GM_CHECKCLIENT, GM_DATA, GM_SERVERUSERINDEX, GM_APPKEEPALIVE, GM_APPKEEPALIVEACK, GM_APPBIGPACK, GM_GATEUSERINFO, GM_CLOSE_SERVER, GATEMSGHDR, GATEUSERINFO };