import CCustomGateClient from "./CustomGateClient";

export enum DATAPROCESSERTYPE {
    dp_Default = 0,
    dp_GameEngine = 1,
}

export default class CRunDataProcesser extends CCustomGateClient {
    m_nActiveUser: number;
    m_boStoping: boolean;
    m_boStarted: boolean;
    m_sGateName: string;
    m_nSendThreadCount: number;
    m_DataProcessType: DATAPROCESSERTYPE;

    constructor(nMaxSession: number) {
        super();
        this.m_nActiveUser = 0;
        this.m_boStoping	  = false;
        this.m_boStarted	  = false;
        this.m_DataProcessType = DATAPROCESSERTYPE.dp_Default;
        this.m_nSendThreadCount = 0;
        this.m_nMaxSessionCount = nMaxSession;
        this.m_Sessions = null;
        this.m_pSockProcesser = null;
    }

    public SetDataProcessType(nType: DATAPROCESSERTYPE): void {
        this.m_DataProcessType = nType;
    }
    public GetDataProcessType(): DATAPROCESSERTYPE {
        return this.m_DataProcessType;
    }
    
}