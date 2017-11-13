
export default {
    type: 'align',
    name: 'align left',
    icon: 'fa fa-align-left',
    i18n: 'align left',
    handler(editor, ev) {
        editor.execCommand('justifyLeft', ev)
    }
}

