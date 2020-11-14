import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICodeMirror } from '@jupyterlab/codemirror';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { yankGenerator } from './yank';

const PLUGIN_ID = 'jupyterlab-vimrc:vimrc';

/**
 * Initialization data for the jupyterlab-vimrc extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ISettingRegistry, ICodeMirror],
  activate: async (
    app: JupyterFrontEnd,
    settings: ISettingRegistry,
    jlabCodeMirror: ICodeMirror
  ) => {
    await jlabCodeMirror.ensureVimKeymap();
    const cm = jlabCodeMirror.CodeMirror as any;

    /**
     * Load the settings for this extension
     *
     * @param setting Extension settings
     */
    function loadSetting(setting: ISettingRegistry.ISettings): void {
      const unnamedplus = setting.get('unnamedplus').composite as boolean;
      cm.Vim.defineOperator(
        'yank',
        yankGenerator(cm.Vim.getRegisterController(), unnamedplus)
      );

      // clear any previously set settings
      cm.Vim.mapclear('normal');
      cm.Vim.mapclear('visual');
      cm.Vim.mapclear('insert');

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

      const inoremap = setting.get('inoremap').composite as string[][];
      inoremap.forEach((arr: string[]) => {
        if (arr[0] && arr[1]) {
          cm.Vim.noremap(arr[0], arr[1], 'insert');
        }
      });

      const nnoremap = setting.get('nnoremap').composite as string[][];
      nnoremap.forEach((arr: string[]) => {
        if (arr[0] && arr[1]) {
          cm.Vim.noremap(arr[0], arr[1], 'normal');
        }
      });

      const vnoremap = setting.get('vnoremap').composite as string[][];
      vnoremap.forEach((arr: string[]) => {
        if (arr[0] && arr[1]) {
          cm.Vim.noremap(arr[0], arr[1], 'visual');
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
