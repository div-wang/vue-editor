
export default {
    name: 'unlink',
    icon: 'fa fa-chain-broken',
    i18n: 'unlink',
    handler(editor) {
        editor.execCommand('unlink')
    }
}