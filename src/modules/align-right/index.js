
export default {
    type: 'align',
    name: 'align right',
    icon: 'fa fa-align-right',
    i18n: 'align right',
    handler(editor, ev) {
        editor.execCommand('justifyRight', ev)
    }
}

