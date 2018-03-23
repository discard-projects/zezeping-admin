export default {
  data () {
    return {
      dialogShow: false,
      dialogoOptions: null,
      form: {}
    }
  },
  methods: {
    showDialog (options, isShow = true) {
      this.dialogoOptions = options
      this.dialogShow = isShow
    },
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
