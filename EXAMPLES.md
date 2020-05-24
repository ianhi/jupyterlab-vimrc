## `ii` -> `Esc`

```json
{
"inoremap": 
    [
        ["ii", "<Esc>"],
    ],
}
```

## Clone paragraph

While the command `yap}p` functions as expected when you type it in, I was unable to get this command to work as mapped. Not sure why, if you can get it to work please open an issue to let me know how. Also, this is an example where it would be preferable to use noremap, but it is not possible with the codemirror vim api

```json
{
"imap": 
    [
        ["cp", "yap<S-}>p"]
    ],
}
```

## `jkl;` -> `hjkl`

These noremap commands all work because their targets are all in the default keymap.

**Beware:** using these mappings will also remap the arrow keys in normal and visual mode resulting in the immensely disconcerting:
```
up -> down
down -> left
right -> up
left -> left
```
if you can live with that then here are the settings to add.

```json
{
"nnoremap":[
    [
        "j", "h",
        
    ],
    [
        "k", "j"
    ],
    [
        "l","k"
    ],
    [
        ";","l"
    ]
],
"vnoremap":[
    [
        "j", "h",
        
    ],
    [
        "k", "j"
    ], 
    [
        "l","k"
    ],
    [
        ";","l"
    ]
],
}
```