export default {
  data () {
    return {
      dialogShow: false,
      item: null,
      form: null
    }
  },
  computed: {
    itemId () {
      return (this.item && this.item.id) || (this.form && this.form.id)
    }
  },
  watch: {
    item (newVal) {
      if (newVal) {
        this.dialogShow = true
        this.fetchData()
      }
    },
    dialogShow (isShow) {
      if (!isShow) {
        this.item = null
      }
    }
  },
  methods: {
    fetchData () {
    },
    _fetchData (promise) {
      promise.then((res) => {
        this.form = res.data.item
      }).catch(() => {
        // this.loading = false
      })
    },

    _handlerUpdate (promise) {
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
