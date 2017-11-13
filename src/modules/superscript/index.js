
export default {
    type: 'script',
    name: 'superscript',
    icon: 'fa fa-superscript',
    i18n: 'superscript',
    handler(editor, ev) {
        editor.execCommand('superscript', ev)
    }
}