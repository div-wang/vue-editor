# 简介

一个基于Vue的富文本编辑器插件，简洁灵活可扩展，适用于vue2.0以上版本，支持IE11.

# 安装 Installation

### 安装


```bash
npm install vue-editor --save-dev
```

### 引入并安装作为全局组件

```js
import Vue from 'vue'
import VueEditor from 'vue-editor'
Vue.use(VueEditor, options);
```

同样你也可以作为局部组件使用，方便在不同的场景里使用不同的配置.

```js
const editor1 = new VueEditor(options1)
const app1 = new Vue({
    components:{
        editor1
    }
})
const editor2 = new VueEditor(options2)
const app2 = new Vue({
    components:{
        editor2
    }
})
```


### 浏览器直接使用

```html
<script src="serverpath/vue.js"></script>
<script src="serverpath/vue-editor.js"></script>
```
通过全局变量`VueEditor`来使用.

```js
Vue.use(VueEditor, options)
```


# 使用说明 Usage

模板代码如下：

```html
<vue-editor :content="content" :height="500"></vue-editor>
```

# options

```js
Vue.use(VueEditor, {
    // 全局组件名称，使用new VueEditor(options)时该选项无效
    name: "vue-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
    showModuleName: false,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标
    icons: {
        table: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa fa-undo",
        fullScreen: "fa fa-arrows-alt"
    },
    // 配置图片模块
    image: {
        // 文件最大体积，单位字节  max file size
        sizeLimit: 512 * 1024,
        // 上传参数,默认把图片转为base64而不上传
        upload: {
            url: null,
            headers: {},
            params: {},
            keyName: NULL, //图片名
            fieldName: {}
        },
        // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        // 响应数据处理,最终返回图片链接
        uploadHandler(responseText){
            // 格式根据上传服务不同返回格式也是不同
            var json = JSON.parse(responseText)
            return `//example.com/${json.key}`
        }
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn）
    language: "zh-cn",
    // 自定义语言
    i18n: {
        "zh-cn": {
            link: '链接',
            unlink: '去除链接',
            table: '表格',
            'row count': '行数',
            'column count': '列数',
            font: '字体',
            'font size': '字号',
            'line height': '行高',
            heading: '标题',
            eraser: '格式清除',
            color: '颜色',
            'please enter a url': '请输入地址',
            'create link': '创建链接',
            bold: '加粗',
            italic: '倾斜',
            underline: '下划线',
            'strike through': '删除线',
            subscript: '上标',
            superscript: '下标',
            'align left': '左对齐',
            'align center': '居中',
            'align right': '右对齐',
            'list ordered': '有序列表',
            'list unordered': '无序列表',
            'fore color': '前景色',
            'background color': '背景色',
            hr: '分隔线',
            undo: '撤消',
            'full screen': '全屏',
            image: '图片',
            save: '确定',
            upload: '上传',
            progress: '进度',
            unknown: '未知',
            'please wait': '请稍等',
            error: '错误',
            abort: '中断',
            reset: '重置',
            'exceed size limit': '超出大小限制'
        }
    },
    // 隐藏不想要显示出来的模块
    hiddenModules: [
        review
    ],
    // 自定义要显示的模块，并控制顺序
    visibleModules: [
        bold,
        italic,
        underline,
        strikeThrough,
        subscript,
        superscript,
        alignLeft,
        alignCenter,
        alignRight,
        listOl,
        listUl,
        color,
        link,
        unlink,
        table,
        image,
        hr,
        eraser,
        undo,
        fullScreen,
        font,
        fontSize,
        heading,
        lineHeight,
        review
    ]
})
```

# 组件属性 attributes

```html
<editor :content="content" :height="500" :z-index="1000" :auto-height="true" :show-module-name="false"></editor>
```

### content

编辑内容

### height

编辑器高度，如果设置了`auto-height`为true，将设置为编辑器的最小高度.

### z-index

层级，将会设置编辑器容量的`z-index`样式属性,默认为1000.

### auto-height

是否自动根据内容控制编辑器高度,默认为true.

### show-module-name

局部设置是否显示模块名称，会覆盖全局的设定.

# 事件
```html
<editor @change="updateData"></editor>
```

### change

每次内容有变动时触发,回传改变后的内容.

# License
[Apache-2.0](http://opensource.org/licenses/Apache-2.0)
