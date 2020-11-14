/**
 * cursor position functions not exposed by CodeMirrr.Vim
 */
function cursorIsBefore(cur1: any, cur2: any): any {
  if (cur1.line < cur2.line) {
    return true;
  }
  if (cur1.line === cur2.line && cur1.ch < cur2.ch) {
    return true;
  }
  return false;
}
function cursorMin(...args: any[]): any {
  let cur2;
  if (args.length > 2) {
    // eslint-disable-next-line prefer-spread
    cur2 = cursorMin.apply(undefined, Array.prototype.slice.call(args, 1));
  } else {
    cur2 = args[1];
  }
  return cursorIsBefore(args[0], cur2) ? args[0] : cur2;
}
/**
 * yank with system register copying enabled
 */

export function yankGenerator(
  registerController: any,
  unnamedplus: boolean
): any {
  function yank(cm: any, args: any, ranges: any, oldAnchor: any): any {
    const vim = cm.state.vim;
    const text = cm.getSelection();
    const endPos = vim.visualMode
      ? cursorMin(
          vim.sel.anchor,
          vim.sel.head,
          ranges[0].head,
          ranges[0].anchor
        )
      : oldAnchor;
    const useUnamedplus = args.registerName === null && unnamedplus;
    if (['+', '*'].indexOf(args.registerName) !== -1 || useUnamedplus) {
      navigator.clipboard.writeText(text).catch(err => {
        // This can happen if the user denies clipboard permissions:
        // or if using safari
        console.error('Could not copy text: ', err);
      });
      cm.focus();
    }
    registerController.pushText(
      args.registerName,
      'yank',
      text,
      args.linewise,
      vim.visualBlock
    );
    return endPos;
  }
  return yank;
}
