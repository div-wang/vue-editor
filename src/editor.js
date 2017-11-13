import RangeHandler from './range/handler'
import './style.css'
import template from './editor.html'
import highlightedDom from './util/highlightedDom'
import modulesClass from './util/modulesClass'

export default {
    template,
    props: {
        content: {
            type: String,
            required: true,
            default: ''
        },
        height: {
            type: Number,
            default: 300,
            validator(val){
                return val >= 100
            }
        },
        zIndex: {
            type: Number,
            default: 1000
        },
        autoHeight: {
            type: Boolean,
            default: true
        },
        showModuleName: {},
        showErrorLog: {
            type: String
        }
    },
    data(){
        return {
            // defaultShowModuleName:false
            // locale: {},
            // modules:{},
            zindex: 10,
            showErrLog: '',
            modulesClass,
            fullScreen: false,
            dashboard: null,
            button: {}
        }
    },
    watch: {
        content(val){
            const content = this.$refs.content.innerHTML
            if (val !== content) {
                this.$refs.content.innerHTML = val
            }
        },
        showErrorLog(val){
            this.showErrLog = val
        },
        fullScreen(val){
            const component = this
            if (val) {
                component.parentEl = component.$el.parentNode
                component.nextEl = component.$el.nextSibling
                document.body.appendChild(component.$el)
                return
            }
            if (component.nextEl) {
                component.parentEl.insertBefore(component.$el, component.nextEl)
                return
            }
            component.parentEl.appendChild(component.$el)
        }
    },
    computed: {
        contentStyle(){
            const style = {}
            if (this.fullScreen) {
                style.height = `${window.innerHeight - this.$refs.toolbar.clientHeight - 1}px`
                return style
            }
            if (!this.autoHeight) {
                style.height = `${this.height}px`
                return style
            }
            style['min-height'] = `${this.height}px`
            return style
        }
    },
    methods: {
        reviewContent() {
            this.$emit('review', this.$refs.content.innerHTML)
        },
        toggleFullScreen(){
            if (this.fullScreen) {
                this.exitFullScreen()
            } else {
                this.enableFullScreen()
            }
        },
        enableFullScreen(){
            this.zindex += 10
            this.fullScreen = true
        },
        exitFullScreen(){
            this.zindex = this.zIndex
            this.fullScreen = false
        },
        focus(){
            this.$refs.content.focus()
        },
        toggleDashboard(dashboard){
            this.dashboard = this.dashboard === dashboard ? null : dashboard
        },
        toggleButtonClass(arg){
            if (!arg.target) return
            const dom = arg.target && arg.target.nodeName === 'SPAN' ? arg.target.parentNode : arg.target
            const name = dom.getAttribute('name')
            const type = dom.getAttribute('data-type')
            const domObject = {
                align: ['align left', 'align center', 'align right'],
                list: ['list ordered', 'list unordered'],
                script: ['subscript', 'superscript']
            }
            if (!this.modulesClass[type]) {
                const arr = domObject[type] || []
                for (let i = arr.length - 1; i >= 0; i--) {
                    this.modulesClass[arr[i]] = false
                }
            }
            this.modulesClass[name] = !this.modulesClass[name]
        },
        execCommand(command, ev){
            this.restoreSelection()
            if (ev) {
                this.toggleButtonClass(ev)
            }
            if (this.range) {
                new RangeHandler(this.range).execCommand(command, typeof ev === 'string' ? ev : '')
            }
            this.$emit('change', this.$refs.content.innerHTML)
        },
        getCurrentRange(){
            return this.range
        },
        saveCurrentRange(){
            const selection = window.getSelection ? window.getSelection() : document.getSelection()
            if (!selection.rangeCount) {
                return
            }
            const content = this.$refs.content
            for (let i = 0; i < selection.rangeCount; i++) {
                const range = selection.getRangeAt(0)
                let start = range.startContainer
                let end = range.endContainer
                // for IE11 : node.contains(textNode) always return false
                start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start
                end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end
                // console.log(start.nodeName, range, end)
                this.forNode(start, end)
                if (content.contains(start) && content.contains(end)) {
                    this.range = range
                    break
                }
            }
        },
        forNode(start, end){
            if (start.nodeName === end.nodeName) {
                highlightedDom(end, this)
                // console.log(end.nodeName)
            } else {
                const nodes = start.childNodes
                if (!nodes) return
                for (let i = nodes.length - 1; i >= 0; i--) {
                    const nodeName = nodes[i].nodeName
                    if (nodeName === 'TEXT') return
                    highlightedDom(start, this)
                    // console.log(start.nodeName)
                    this.forNode(nodes[i].nodeName, end)
                }
            }
        },
        restoreSelection(){
            const selection = window.getSelection ? window.getSelection() : document.getSelection()
            selection.removeAllRanges()
            if (this.range) {
                selection.addRange(this.range)
            } else {
                const content = this.$refs.content
                const div = document.createElement('div')
                const range = document.createRange()
                content.appendChild(div)
                range.setStart(div, 0)
                range.setEnd(div, 0)
                selection.addRange(range)
                this.range = range
            }
        },
        activeModule(module, ev){
            if (typeof module.handler === 'function') {
                module.handler(this, ev)
                return
            }
            if (module.hasDashboard) {
                this.toggleDashboard(`dashboard-${module.name}`)
            }
        }
    },
    created(){
        this.modules.forEach((module) => {
            if (typeof module.init === 'function') {
                module.init(this)
            }
        })
    },
    mounted(){
        const content = this.$refs.content
        content.innerHTML = this.content
        content.addEventListener('mouseup', this.saveCurrentRange, false)
        content.addEventListener('keyup', () => {
            this.$emit('change', content.innerHTML)
            this.saveCurrentRange()
        }, false)
        content.addEventListener('mouseout', (e) => {
            if (e.target === content) {
                this.saveCurrentRange()
            }
        }, false)
        this.touchHandler = (e) => {
            if (content.contains(e.target)) {
                this.saveCurrentRange()
            }
        }
        this.zindex = this.zIndex
        window.addEventListener('touchend', this.touchHandler, false)
    },
    updated(){
        // update dashboard style
        if (this.$refs.dashboard){
            this.$refs.dashboard.style.maxHeight = `${this.$refs.content.clientHeight}px`
        }
    },
    beforeDestroy(){
        window.removeEventListener('touchend', this.touchHandler)
        this.modules.forEach((module) => {
            if (typeof module.destroyed === 'function') {
                module.destroyed(this)
            }
        })
    }
}