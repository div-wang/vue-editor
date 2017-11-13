
export default {
    name: 'bold',
    icon: 'fa fa-bold',
    i18n: 'bold',
    handler(editor, ev) {
        editor.execCommand('bold', ev)
    }
}