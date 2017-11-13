
export default {
    type: 'list',
    name: 'list unordered',
    icon: 'fa fa-list-ul',
    i18n: 'list unordered',
    handler(editor, ev) {
        editor.execCommand('insertUnorderedList', ev)
    }
}