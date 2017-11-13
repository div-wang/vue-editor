
export default {
    name: 'underline',
    icon: 'fa fa-underline',
    i18n: 'underline',
    handler(editor, ev) {
        editor.execCommand('underline', ev)
    }
}