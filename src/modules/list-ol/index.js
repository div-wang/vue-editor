
export default {
    type: 'list',
    name: 'list ordered',
    icon: 'fa fa-list-ol',
    i18n: 'list ordered',
    handler(editor, ev) {
        editor.execCommand('insertOrderedList', ev)
    }
}