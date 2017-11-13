
export default {
    name: 'undo',
    icon: 'fa-undo fa',
    i18n: 'undo',
    handler(editor) {
        editor.execCommand('undo')
    }
}

