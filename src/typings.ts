// Generic wrapper class to run any function only when allowed to
// Useful for running toggles only once, on certain conditions
export class toggleHelper {
    allowRun: boolean;
    action: () => any;

    // Allow running whatever action the first time on initialization
    constructor(action: () => any) {
        this.allowRun = true;
        this.action = action;
    }

    // After first run, disable next call to run
    // It's up to the developer for deciding on when to allow the next run
    run() {

        if (this.allowRun) {
            this.action();
            this.allowRun = false;
        }

    }

};

// Default config file to assume when trying to connect to a model tracking server
export class appConfig {

    vmc_listen_ip: string
    vmc_listen_port: number
    web_listen_ip: string
    web_listen_port: number
    model_update_frequency: number
    runtime_config_file: string
    initial_config_file: string
    vrm_file: string
    isEmbedded: boolean

    constructor() {
        this.vmc_listen_ip = "0.0.0.0";
        this.vmc_listen_port = 39540;
        this.web_listen_ip = "127.0.0.1";
        this.web_listen_port = 3579;
        this.model_update_frequency = 60;
        this.runtime_config_file = "unknown";
        this.initial_config_file = "unknown";
        this.vrm_file = "unknown";
        this.isEmbedded = false;
    }

}

export class addressPrefix {

    socket: string; // Regular address, without URL protocol

    constructor(socket: string) {
        this.socket = socket;
    }

    urlWS(): string {
        return ((location.protocol === "https:") ? "wss://" : "ws://") + this.socket;
    }

    url(): string {
        return location.protocol + "//" + this.socket;
    }

}