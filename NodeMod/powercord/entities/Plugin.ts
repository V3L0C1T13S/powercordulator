import { Plugin as vzPlugin } from "@vizality/entities";

//@ts-ignore
export class Plugin extends vzPlugin {
    pcCompatVersion = "1.0.0";

    private __pcCompatOldStart: () => void;
    private __pcCompatOldStop: () => void;

    //@ts-ignore
    get entityID() { return this.addonId }

    loadStylesheet(...args: any[]) {
        //@ts-ignore shut up
        return super.injectStyles(...args);
    }

    _load (...args: any[]) {
        this.__startPcPlugin()
        //@ts-ignore
        return super._load(...args);
    }

    _unload(...args: any[]) {
        this.__patchBefore();
        //@ts-ignore
        return super._unload(...args);
    }

    __startPcPlugin(...args: any[]) {
        this.__patchAfter();
        //@ts-ignore this is going to exist at runtime
        return this.startPlugin(...args);
    }

    __stopPcPlugin(...args: any[]) {
        this.__patchAfter();
        //@ts-ignore
        return this.pluginWillUnload(...args);
    }

    /** Dear dperilo, please consider making typings for this. */
    private __patchBefore() {
        //@ts-ignore
        this.__pcCompatOldStart = this.start;
        //@ts-ignore
        this.__pcCompatOldStop = this.stop;
        //@ts-ignore
        this.start = this.__startPcPlugin;
        //@ts-ignore
        this.stop = this.__stopPcPlugin;
    }

    private __patchAfter() {
        //@ts-ignore
        this.start = this.__pcCompatOldStart;
        //@ts-ignore
        this.stop = this.__pcCompatOldStop;
    }
}
