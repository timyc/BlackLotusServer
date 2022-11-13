export enum DATAPROCESSERTYPE {
    dp_Default = 0,
    dp_GameEngine = 1,
}

export default class CRunDataProcesser {
    m_nActiveUser: number;
    m_boStoping: boolean;
    m_boStarted: boolean;
    m_sGateName: string;
    m_nSendThreadCount: number;
    m_DataProcessType: DATAPROCESSERTYPE;
    m_hProcRecvThread: pthread_t;

    constructor(nMaxSession: number) {
        this.m_nActiveUser = 0;
        this.m_boStoping	  = false;
        this.m_boStarted	  = false;
        this.m_DataProcessType = DATAPROCESSERTYPE.dp_Default;
        this.m_hProcRecvThread = null;
        this.m_nSendThreadCount = 0;
        this.m_nMaxSessionCount = nMaxSession;
        this.m_Sessions = null;
        this.m_pSockProcesser = null;
    }
    
}