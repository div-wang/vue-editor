import template from './dashboard.html'

export default {
    template,
    data(){
        return {
            button: this.$parent.button
        }
    },
    mounted(){
      this.button = this.$parent.button
    }
}