
export default {
    name: 'font',
    icon: 'fa fa-font',
    i18n: 'font',
    title: '字体',
    selects: [
        'Microsoft YaHei',
        'Helvetica Neue',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Verdana',
        'Georgia',
        'Times New Roman',
        'Trebuchet MS',
        'Microsoft JhengHei',
        'Courier New',
        'Impact',
        'Comic Sans MS',
        'Consolas'
    ],
    handler(editor, ev) {
        editor.execCommand('fontName', ev.target.value)
    }
}