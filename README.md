# jupyterlab-vimrc

![Github Actions Status](https://github.com/ianhi/jupyterlab-vimrc/workflows/Build/badge.svg)

add a basic vimrc to jupyterlab  

Currently supports these commands:
```
imap
nmap
vmap
```

you can modify the mapping by editing the settings using Settings > Advanced Settings Editor (Ctrl+,) and selecting the settings for `vimrc`. Commands are defined as arrays with the syntax:
[lhs, rhs]. So map `ii` to `<Esc>` in insert mode add the following to the settings:
```json
{
"imap": [
    ["ii","<Esc>"]
    ],
}
```
## Requirements

* JupyterLab >= 2.0

## Install

```bash
jupyter labextension install jupyterlab-vimrc
```

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
