import { GATEMSGHDR } from '../common/GateProto';

export interface GateMsg {
    header: GATEMSGHDR,
    nBuffLen: number,
    data: string
}

export default class CCustomGateClient {
    m_socket: number;
    m_szSrvHost: string;
    m_nSrvPort: number;
    m_szClientName: string;
    m_bConnected: boolean;
    m_bStoped: number;
    m_SendMsgList: CDataPacket[];
}