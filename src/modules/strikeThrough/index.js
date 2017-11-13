
export default {
    name: 'strike through',
    icon: 'fa fa-strikethrough',
    i18n: 'strike through',
    handler(editor, ev) {
        editor.execCommand('strikeThrough', ev)
    }
}