
export default {
    name: 'font size',
    icon: 'fa fa-font',
    i18n: 'font size',
    title: '字号',
    selects: [
        '12px', '14px', '16px', '18px', '20px', '22px', '24px'
    ],
    handler(editor, ev) {
        editor.execCommand('fontSize', ev.target.value)
    }
}