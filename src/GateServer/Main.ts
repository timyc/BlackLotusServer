import * as fs from 'fs';
import * as path from 'path';
import { OutputMsg } from '../utils/shared_utils';
import CRunDataProcesser from './DataProcess';
import type CRunSockProcesser from './SockProcess';

let GateEngineRunning: boolean = true;

['SIGINT', 'SIGTERM', 'SIGHUP']
    .forEach(signal => process.on(signal, () => {
        GateEngineRunning = false;
        OutputMsg(2, `signal(${signal}) signal_handler... `);
    }));
    
let g_ServerIsRunning: boolean = true;

export default class GateServer {
    version: string;
    gateList: CRunSockProcesser[];
    constructor() {
        this.gateList = [];
        this.version = "0.0.1";
    }
    ServerMain(): void {
        let argv = require('minimist')(process.argv.slice(2));
        if (!argv.hasOwnProperty("server")) {
            throw 'ERR: No server config specified. USAGE: ts-node src/GateServer/Main --server=<SERVER_CONFIG_FILE>';
        }
        if (this.CreateAndStartGateServers(argv.server)) {
            OutputMsg(1, "-------------------------------------------");
            OutputMsg(1, `Gateway started, version is ${this.version}`);
            OutputMsg(1, "'spf' command can view the current gateway status");
            OutputMsg(1, "'quit' command stops the service and exits the program");
            OutputMsg(1, "-------------------------------------------");
        }
        // Keep the process alive
        let timer = setInterval(() => {
            if (!GateEngineRunning || !g_ServerIsRunning) {
                clearInterval(timer);
                this.DestroyGateServers();
            }
        }, 10);
    }
    CreateAndStartGateServers(pConfig: string): boolean {
        let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../../configs/${pConfig}`)).toString());
        let pRunSock: CRunSockProcesser;
        let pRunData: CRunDataProcesser;
        pRunData = new CRunDataProcesser(Math.max(1024, config.LocalService.MaxSession));
        pRunData.SetSendThreadCount(config.LocalService.SendThreadCount);
        pRunData.SetDataProcessType(0);
        pRunData.SetServerHost(config.BackServer.Host);
        pRunData.SetServerPort(config.BackServer.Port);
        pRunData.SetName(config.LocalService.ServerName);
        pRunSock = new CSelectRunSockProcesser();
        pRunSock.SetBindAddress(config.GateServer.Address);
        pRunSock.SetBindPort(config.GateServer.Port);
        pRunSock.SetDataProcesser(pRunData);
        pRunData.SetRunSockProcesser(pRunSock);
        this.gateList.push(pRunSock);
        if ( !pRunSock.InitBase() || !pRunData.Startup() || !pRunSock.Start() ) {
            OutputMsg(3, `Start GateServer[${config.GateServer.ServerName}] Failed`);
            return false;
        }
        OutputMsg(1, `GateServer[${config.GateServer.ServerName}] Started`);
        return true;
    }
    DestroyGateServers(): void {
        let nCount = this.gateList.length;
        for (let i = 0; i < nCount; i++) {
            let pRunSock: CRunSockProcesser = this.gateList[i];
            pRunSock.Stop();
            let pRunData: CRunDataProcesser = pRunSock.GetDataProcesser();
            pRunData.Stop();
            OutputMsg(1, `GateServer ${pRunData.GetName()} stopped`);
        }
        this.gateList = [];
    }
}

let gateServer = new GateServer();
gateServer.ServerMain();