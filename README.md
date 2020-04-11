# jupyterlab-vimrc

![Github Actions Status](https://github.com/ianhi/jupyterlab-vimrc/workflows/Build/badge.svg)

add a basic vimrc to jupyterlab  
## Install

```bash
jupyter labextension install jupyterlab-vimrc
```

## Basic Usage

You can modify the contents of this psuedo vimrc by editing the settings using Settings > Advanced Settings Editor (Ctrl+,) and selecting the settings for `vimrc`. Commands are defined as arrays with the syntax:
[lhs, rhs]. For example you can map `ii` to `<Esc>` in insert mode and use `cp` to copy a paragraph by adding the following to the settings:
```json
{
"imap": 
    [
        ["ii", "<Esc>"],
        ["cp", "yap<S-}>p"]
    ],
}
```
I original saw the `cp` command using `nnoremap`, but as discussed below there are some large caveats with using the noremap commands for codemirror vim mode.

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
1. The right hand side of the mapping must be defined in the default vim.js keymap
2. The default keymap must not be an [Ex/Key]to[Ex/Key] mapping.

The result will then be that you have changed the `lhs` for the default keymapping but nothing else. If your mapping doesn't meet these conditions then the mapping will not be performed and this extension will put an error message in the console. So it may be in your best interest to just use the map commands and be careful to not get caught in infinite mapping loops.

## Requirements

* JupyterLab >= 2.0



## Contributing

### Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to jupyterlab-vimrc directory

# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension link .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```

### Uninstall

```bash

jupyter labextension uninstall jupyterlab-vimrc
```
