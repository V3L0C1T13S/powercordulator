/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import { Plugin as vzPlugin } from '@vizality/entities';

// Mainly typings for untyped entities
class vzPluginPrivateMixin extends vzPlugin {
    // VZ
    start: () => void;
    stop: () => void;

    // PC
    startPlugin: (...args: any[]) => void;
    pluginWillUnload: (...args: any[]) => void;
}

// @ts-ignore
export class Plugin extends vzPluginPrivateMixin {
    pcCompatVersion = '1.0.0';

    private __pcCompatOldStart: () => void;
    private __pcCompatOldStop: () => void;

    // @ts-ignore
    get entityID () { return this.addonId; }

    loadStylesheet (path: string) {
      return super.injectStyles(path);
    }

    _load (...args: any[]) {
      this.__startPcPlugin();
      // @ts-ignore
      return super._load(...args);
    }

    _unload (...args: any[]) {
      this.__patchBefore();
      // @ts-ignore
      return super._unload(...args);
    }

    __startPcPlugin (...args: any[]) {
      this.__patchAfter();
      return this.startPlugin(...args);
    }

    __stopPcPlugin (...args: any[]) {
      this.__patchAfter();
      return this.pluginWillUnload(...args);
    }

    /** Dear dperilo, please consider making typings for this. */
    private __patchBefore () {
      this.__pcCompatOldStart = this.start;
      this.__pcCompatOldStop = this.stop;
      this.start = this.__startPcPlugin;
      this.stop = this.__stopPcPlugin;
    }

    private __patchAfter () {
      this.start = this.__pcCompatOldStart;
      this.stop = this.__pcCompatOldStop;
    }
}
