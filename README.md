# jupyterlab-vimrc

![Github Actions Status](https://github.com/ianhi/jupyterlab-vimrc/workflows/Build/badge.svg)

add a basic vimrc to jupyterlab  + support for yanking to the system clipboard.

I also recommend:
- https://github.com/axelfahy/jupyterlab-vim (vim in the notebook)
- ~~https://github.com/ianhi/jupyterlab_vim-system-clipboard-support (yank to + or * registers)~~ (Included in this extension for jlab3! - still necessary for jlab2)

## Install

```bash
# for jlab 3+
pip install jupyterlab-vimrc
```

or for jupyterlab=2
```bash
jupyter labextension install jupyterlab-vimrc@0.3.0
```


## Basic Usage

You can modify the contents of this psuedo vimrc by editing the settings using Settings > Advanced Settings Editor (Ctrl+,) and selecting the settings for `vimrc`. Commands are defined as arrays with the syntax:
[lhs, rhs]. For example you can map `ii` to `<Esc>` in insert mode by adding the following to the settings:
```json
{
"imap": 
    [
        ["ii", "<Esc>"],
    ],
}
```
Note that the key names are case sensitive; `<ESC>` will not work. See the [Examples](EXAMPLES.md) for other premade settings files such as `hjkl` -> `jkl;`

## Supported Commands
Currently supports these commands:
```
imap
nmap
vmap
inoremap*
nnoremap*
vnoremap*
```
### <span style="font-size:larger;"><b>*</b></span> noremap caveat
The noremap commands are also availiable but come with several caveats:

The comment for the `noremap` function in [`codemirror/keymap/vim.js`](https://github.com/codemirror/CodeMirror/blob/b2d26b4ccb1d0994ae84d18ad8b84018de176da9/keymap/vim.js#L764-L766) says the following:
> Non-recursive map function.  
> NOTE: This will not create mappings to key maps that aren't present in the default key map. See TODO at bottom of function.

My reading of this comment and looking through the actual function leads me to believe that the restrictions are:
1. The right hand side of the mapping must be defined in the [default vim.js keymap](https://github.com/codemirror/CodeMirror/blob/91cb2943208f7fa34ba125ea2ef30582ea601f32/keymap/vim.js#L47)
2. The default keymap must not be an [Ex to Ex] or [Key to Key]  mapping.

The result will then be that you have changed the `lhs` for the default keymapping but nothing else. If your mapping doesn't meet these conditions then the mapping will not be performed and this extension will put an error message in the console. So it may be in your best interest to just use the map commands and be careful to not get caught in infinite mapping loops.

## Requirements

* JupyterLab >= 3.0 (`pip install jupyterlab-vimrc`)
* JupyterLab >= 2.0 (`jupyter labextension install jupyterlab-vimrc@0.3.0`)
* JupyterLab >= 1.0 (`jupyter labextension install jupyterlab-vimrc@jlab1`)



## Contributing

### Development install

Note: You will need NodeJS to build the extension package.
```bash
conda install -c conda-forge nodejs
```

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab-vimrc directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

### Uninstall

```bash
pip uninstall jupyterlab-vimrc
jupyter labextension uninstall jupyterlab-vimrc
```
