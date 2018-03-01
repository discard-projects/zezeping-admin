export default {
  data () {
    return {
      q: {}
    }
  },
  watch: {
    '$route': {
      handler () {
        this.fillData()
      },
      immediate: true
    }
  },
  methods: {
    fillData () {
      let q = {
        page: 1,
        per_page: 25
      }
      // full data from url query, if admin just refresh page, can not load q_xxx keys.
      this.searches && this.searches.forEach(item => {
        let key = item.key
        let value = this.$route.query[item.key]
        if (value) {
          if (!item.type || item.type === String) {
            q[key] = this.$route.query[key]
          }
        }
      })
      this.q = q
    }
  }
}
