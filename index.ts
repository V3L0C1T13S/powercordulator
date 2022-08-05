/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Plugin } from '@vizality/entities';
import { join } from 'path';
import Module from 'module';
import { rename } from 'fs/promises';
import Notifications from '@vizality/src/src/api/Notifications';
import { createProxy } from './createProxy';
import { ToastInfo } from './types';

declare let vizality: Vizality;

export default class Powercordulator extends Plugin {
  private settings_regex = /\(.*(\/addons\/plugins\/(.*)\/.*)\)/;
  private pcModulesPath = join(__dirname, 'NodeMod');

  private fontAwesome = document.createElement('link');

  async start () {
    if (!__dirname.endsWith('00-powercordulator')) {
      await rename(__dirname, join(__dirname, '..', '00-powercordulator'));
      window.location.reload();
    }

    this.fontAwesome.setAttribute('rel', 'stylesheet');
    this.fontAwesome.setAttribute('href', 'https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css');
    document.head.appendChild(this.fontAwesome);

    (Module as any).globalPaths.push(this.pcModulesPath);

    // NOTE: you can ignore errors about get() accessors, typescript doesn't know we're targetting es5+
    (window as any).powercord = createProxy(vizality, {
      pluginManager: createProxy(vizality.manager.plugins, {
        getPlugins: () => vizality.manager.plugins.items,
        // @ts-ignore
        get plugins () { return vizality.manager.plugins.items; },
      }),
      styleManager: createProxy(vizality.manager.themes, {
        getStyles: () => vizality.manager.themes.items,
        // @ts-ignore
        get styles () { return vizality.manager.themes.items; },
      }),
      api: createProxy(vizality.api, {
        settings: createProxy(vizality.api.settings, {
          registerSettings: (addonId, opts) => {
            const register = (vizality.api.settings.registerSettings || vizality.api.settings._registerSettings).bind(vizality.api.settings);
            if (!vizality.manager.plugins.has(addonId)) {
              [ , , addonId ] = (new Error()).stack.split('\n').slice(2, 3).pop().match(this.settings_regex);
            }
            return register({
              addonId,
              ...opts,
            });
          },
          unregisterSettings: (addonId) => {
            const unregister = (vizality.api.settings.unregisterSettings || vizality.api.settings._unregisterSettings).bind(vizality.api.settings);
            if (!vizality.manager.plugins.has(addonId)) {
              [ , , addonId ] = (new Error()).stack.split('\n').slice(2, 3).pop().match(this.settings_regex);
            }
            return unregister(addonId);
          },
        }),
        i18n: createProxy(vizality.api.i18n, {
          loadAllStrings: vizality.api.i18n.injectAllStrings,
          loadStrings: vizality.api.i18n.injectStrings,
        }),
        // @ts-ignore - undocumented API
        notices: createProxy(vizality.api.notifications, {
          sendToast: (id: string, toast: ToastInfo) => {
            // @ts-ignore
            vizality.api.notifications.sendToast({
              id,
              header: toast.header,
              content: toast.content,
            });
          },
        }),
      }),
    });

    this.restoreLocalStorage();

    const toReload = this.settings.get('tempDisabled', []);
    for (const e of toReload) {
      try {
        if (!vizality.manager.plugins.get(e) || !vizality.manager.plugins.isEnabled(e)) {
          await vizality.manager.plugins.mount(e);
          await vizality.manager.plugins.get(e)._load(true);
        }
      } catch (e) {
        this.log(e);
      }
    }
    this.settings.delete('tempDisabled', []);
  }

  private restoreLocalStorage () {
    if (window.localStorage) return;
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    window.localStorage = Object.getOwnPropertyDescriptor(frame.contentWindow, 'localStorage').get.call(window);
    frame.remove();
  }

  async stop () {
    const tempDisabled = [];
    for (const [ id, e ] of vizality.manager.plugins._items) {
      try {
        if (e.pcCompatVersion !== undefined) {
          if (vizality.manager.plugins.isEnabled(id)) {
            await vizality.manager.plugins.unmount(id, true);
            tempDisabled.push(id);
            this.log('Stopped ', id);
          }
        }
      } catch (e) {
        this.log('Ignoring error shutting down, caused by external plugin', id);
      }
    }

    this.settings.set('tempDisabled', tempDisabled);
    (Module as any).globalPaths = (Module as any).globalPaths.filter((x) => x !== this.path);
    Object.keys(require.cache).filter((x) => x.includes('/modules/powercord'))?.forEach((x) => delete require.cache[x]);
    delete (window as any).powercord;
    delete window.localStorage;
    this.fontAwesome.remove();
    this.log('Goodbye!');
  }
}
