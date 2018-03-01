<template>
  <el-select v-model.number="selectValue" filterable remote placeholder="search" :remote-method="remoteMethod" :loading="loading">
    <el-option v-for="item in items" :key="item.id" :label="item[labelKey]" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import handleApi from '@/libs/utils/handleApi'
export default {
  props: {
    value: {
      require: true
    },
    item: {
      require: false,
      type: Object,
      default: () => { return {} }
    },
    apiPath: {
      require: true
    },
    labelKey: {
      require: true
    }
  },
  data () {
    return {
      items: [],
      loading: false,
      selectValue: this.value
    }
  },
  computed: {
    realApi () {
      return handleApi(this.apiPath, this.item)
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.selectValue) {
        this.selectValue = newVal
        this.remoteMethod(this.labelKey)
      }
    },
    selectValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    remoteMethod (query) {
      this.cusAxios.get(this.realApi, {[`q_${this.labelKey}_cont`]: query}).then(res => {
        this.loading = false
        this.items = res.data.items
      }).catch(() => {
        this.loading = false
      })
    }
  },
  mounted () {
    this.remoteMethod()
  }
}
</script>

<style lang="css">
</style>
