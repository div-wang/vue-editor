import Command from '../../range/command'

export default {
    name: 'line height',
    icon: 'fa fa-text-height',
    i18n: 'line height',
    title: '行高',
    selects: [
        '1.0', '1.2', '1.5', '1.8', '2.0', '2.5', '3.0'
    ],
    handler(editor, ev) {
        editor.execCommand(Command.LINE_HEIGHT, ev.target.value)
    }
}