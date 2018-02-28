export default {
  data () {
    return {
      paginateMeta: {},
      tableData: {
        data: [],
        dataIntros: [],
        opIntro: null,
        loading: false
      },
      data: null
    }
  },
  watch: {
    '$route': {
      handler () {
        this.fetchData()
      },
      immediate: true
    }
  },
  methods: {
    beforeFetch () {
      this.tableData.data = []
      this.tableData.loading = true
    },
    fetchData () {},
    _fetchData (promise) {
      this.beforeFetch()
      promise.then((res) => {
        this.afterFetch(res.data)
      }).catch(() => {
        this.tableData.loading = false
      })
    },
    afterFetch (data) {
      this.tableData.loading = false
      this.paginateMeta = data.pagination
      this.data = data
      this.tableData.data = data.items
    }
  }
}
