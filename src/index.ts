import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-vimrc extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-vimrc',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-vimrc is activated!');
  }
};

export default extension;
