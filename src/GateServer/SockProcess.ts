import net from 'node:net';
import type CRunDataProcesser from './DataProcess';

export enum RUNSOCKTYPE {
    rsUndefined = 0, // DEFAULT = 0
    rsSelect,
    rsIOCP,
}
export interface SOCKADDRIN {
    sin_family: number;
    sin_port: number;
    sin_addr: string;
}

export default class CRunSockProcesser {
    private m_RunSockType: RUNSOCKTYPE;
    private m_boStoping: boolean;
    private m_ListenSocket?: net.Server;
    private m_BindAddr: SOCKADDRIN;
    private m_pDataProcesser?: CRunDataProcesser;
    private m_SessionFullTick: number;
    
    constructor() {
        this.m_RunSockType = 0;
        this.m_boStoping = true;
        this.m_ListenSocket = undefined;
        this.m_BindAddr = {
            sin_family: 2,
            sin_port: 8080,
            sin_addr: '127.0.0.1',
        }
        this.m_pDataProcesser = undefined;
        this.m_SessionFullTick = 0;
    }

    private InitAcceptSocket(): boolean {
        this.m_ListenSocket = net.createServer((socket) => {
            socket.on('data', async (data) => {
                console.log(data);
            });
            socket.on('end', () => {
                console.log('disconnected');
            });
            socket.on('error', (err) => {
                console.log(err);
            });
        });
        return true;
    }
    private UninitAcceptSocket(): void {
        if (this.m_ListenSocket) {
            this.m_ListenSocket.close();
            this.m_ListenSocket = undefined;
        }
    }
    private NewSession(): void {
        this.m_ListenSocket?.listen(this.m_BindAddr.sin_port, this.m_BindAddr.sin_addr);
    }
    public SetBindAddress(sAddress: string): void {
        this.m_BindAddr.sin_addr = sAddress;
    }
    public SetBindPort(nPort: number): void {
        this.m_BindAddr.sin_port = nPort;
    }
    public GetBindAddress(): string {
        return this.m_BindAddr.sin_addr;
    }
    public GetBindPort(): number {
        return this.m_BindAddr.sin_port;
    }
    public GetRunSockType(): RUNSOCKTYPE {
        return this.m_RunSockType;
    }
    public GetDataProcesser(): CRunDataProcesser {
        return this.m_pDataProcesser as CRunDataProcesser;
    }
    public SetDataProcesser(pDataProcesser: CRunDataProcesser): CRunDataProcesser {
        let oldDataProcesser = this.m_pDataProcesser;
        this.m_pDataProcesser = pDataProcesser;
        return oldDataProcesser as CRunDataProcesser;
    }
    public InitBase(): boolean {
        return true;
    }
    public UninitBase(): void {
        return;
    }
    public Start(): boolean {
        this.m_boStoping = false;
        this.m_SessionFullTick = 0;
        return true;
    }
    public Stop(): void {
        this.m_boStoping = true;
    }
}