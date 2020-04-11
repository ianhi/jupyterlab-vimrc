import * as CodeMirror from 'codemirror';
import 'codemirror/keymap/vim.js';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

const PLUGIN_ID = 'jupyterlab-vimrc:vimrc';
/**
 * Initialization data for the jupyterlab-vimrc extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settings: ISettingRegistry) => {
    //let imap = [[]]
    //let nmap: [[]]
    //let vmap = string[[]]
    const cm = CodeMirror as any;

    /**
     * Load the settings for this extension
     *
     * @param setting Extension settings
     */
    function loadSetting(setting: ISettingRegistry.ISettings): void {
      // clear any previously set settings
      cm.Vim.mapclear();
      // Read the settings and set values in codemirror
      const imap = setting.get('imap').composite as string[][];
      imap.forEach((arr: string[]) => {
        if (arr[0] && arr[1]) {
          cm.Vim.map(arr[0], arr[1], 'insert');
        }
      });

      const nmap = setting.get('nmap').composite as string[][];
      nmap.forEach((arr: string[]) => {
        if (arr[0] && arr[1]) {
          cm.Vim.map(arr[0], arr[1], 'normal');
        }
      });

      const vmap = setting.get('vmap').composite as string[][];
      vmap.forEach((arr: string[]) => {
        if (arr[0] && arr[1]) {
          cm.Vim.map(arr[0], arr[1], 'visual');
        }
      });
    }

    // Wait for the application to be restored and
    // for the settings for this plugin to be loaded
    Promise.all([app.restored, settings.load(PLUGIN_ID)]).then(
      ([, setting]) => {
        // read the settings
        loadSetting(setting);

        setting.changed.connect(loadSetting);
      }
    );
  }
};

export default extension;
