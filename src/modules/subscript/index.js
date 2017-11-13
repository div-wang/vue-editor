
export default {
    type: 'script',
    name: 'subscript',
    icon: 'fa fa-subscript',
    i18n: 'subscript',
    handler(editor, ev) {
        editor.execCommand('subscript', ev)
    }
}