
export default {
    type: 'align',
    name: 'align center',
    icon: 'fa fa-align-center',
    i18n: 'align center',
    handler(editor, ev) {
        editor.execCommand('justifyCenter', ev)
    }
}

