
export default {
    name: 'heading',
    icon: 'fa fa-text-height',
    i18n: 'heading',
    title: '标题',
    selects: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    handler(editor, ev) {
        editor.execCommand('formatBlock', ev.target.value)
    }
}