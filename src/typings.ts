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
