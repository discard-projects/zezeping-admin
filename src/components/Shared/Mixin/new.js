export default {
  data () {
    return {
      dialogShow: false,
      form: {}
    }
  },
  methods: {
    _handlerCreate (promise) {
      let loading = this.$loading()
      promise.then(res => {
        loading.close()
        this.$emit('fetchData')
        this.dialogShow = false
      }).catch(() => {
        loading.close()
      })
    }
  }
}
