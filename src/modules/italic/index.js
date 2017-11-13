
export default {
    name: 'italic',
    icon: 'fa fa-italic',
    i18n: 'italic',
    handler(editor, ev) {
        editor.execCommand('italic', ev)
    }
}