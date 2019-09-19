
// summernote https://summernote.org/

<template>
  <div id="summernote" class="summernote"></div>
</template>

<script>
import { deleteHtmlElement } from '@/common/utils.js'
const tools = {
  // placeholder: 'Hello stand alone ui',
  lang: 'zh-CN',
  tabsize: 2,
  height: 300,
  minHeight: 300,
  maxHeight: 300,
  toolbar: [
    // [groupName, [list of button]]
    ['font', ['fontname', 'bold', 'italic', 'underline', 'strikethrough', 'fontsize', 'color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['insert', ['picture', 'video', 'link']],
    ['Misc', ['undo', 'redo']]
  ]
}
export default {
  components: {},
  props: {},
  data () {
    return {
      contentHTML: ''
    }
  },
  mounted () {
    $('#summernote').summernote(tools)
    this.setCallbacks()
  },
  beforeDestroy () {
    $('#summernote').summernote('destroy')
  },
  methods: {
    createHTMLTags () {
      if (document.head.querySelector('.summernote-style')) { return }
      const srcList = [
        './static/summernote-source/jquery-3.2.1.slim.min.js',
        './static/summernote-source/summernote-lite.min.js',
        './static/summernote-source/lang/summernote-zh-CN.js'
      ]
      for (let item of srcList) {
        let tag = document.createElement('script')
        tag.src = item
        document.head.appendChild(tag)
      }
      let cssTag = document.createElement('link')
      cssTag.rel = 'stylesheet'
      cssTag.className = 'summernote-style'
      cssTag.href = './static//summernote-source/summernote-lite.css'
      document.head.appendChild(cssTag)
    },
    setCallbacks () {
      $('#summernote').on('summernote.change', (we, contents, $editable) => {
        this.contentHTML = contents
        this.$emit('on-change', contents)
      })
    },
    contentIsEmpty () {
      return Boolean($('#summernote').summernote('isEmpty'))
    },
    getText () {
      return deleteHtmlElement(this.contentHTML)
    },
    getHTML () {
      return this.contentHTML
    },
    setHTML (content) {
      $('#summernote').summernote('code', content)
    }
  },
  computed: {},
  watch: {}
}
</script>
