const highlightedDom = (node, editor) => {
    let nodeName = node.nodeName
    const style = node.getAttribute('style')
    if (nodeName === 'LI') {
        nodeName = node.parentNode.nodeName
    }

    if (style && style.indexOf('text-align:') > -1) {
        if (style.indexOf('left') > -1) {
            nodeName = 'left'
        }
        if (style.indexOf('right') > -1) {
            nodeName = 'right'
        }
        if (style.indexOf('center') > -1) {
            nodeName = 'center'
        }
    }
    switch (nodeName) {
        case 'B': {
            editor.modulesClass.bold = true
            break
        }
        case 'I': {
            editor.modulesClass.italic = true
            break
        }
        case 'U': {
            editor.modulesClass.underline = true
            break
        }
        case 'STRIKE': {
            editor.modulesClass['strike through'] = true
            break
        }
        case 'SUB': {
            editor.modulesClass.subscript = true
            break
        }
        case 'SUP': {
            editor.modulesClass.superscript = true
            break
        }
        case 'OL': {
            editor.modulesClass['list ordered'] = true
            break
        }
        case 'UL': {
            editor.modulesClass['list unordered'] = true
            break
        }
        case 'left': {
            editor.modulesClass['align left'] = true
            break
        }
        case 'center': {
            editor.modulesClass['align center'] = true
            break
        }
        case 'right': {
            editor.modulesClass['align right'] = true
            break
        }
        default: {
            editor.modulesClass = {
                link: false,
                table: false,
                bold: false,
                italic: false,
                underline: false,
                'strike through': false,
                subscript: false,
                superscript: false,
                'align left': false,
                'align center': false,
                'align right': false,
                'list ordered': false,
                'list unordered': false
            }
            break
        }
    }
}
export default highlightedDom
