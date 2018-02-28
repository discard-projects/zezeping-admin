<template>
  <el-tag :type="getType(status)" style="white-space: inherit; height: auto;">{{statusDesc}}</el-tag>
</template>

<script>
/* eslint-disable */
import { Tag } from 'element-ui'
export default {
  name: 'StatusTag',
  props: {
    status: [String],
    statusDesc: [String],
    gray: [String, Array],
    primary: [String, Array],
    success: [String, Array],
    warning: [String, Array],
    danger: [String, Array],
    fail: [String, Array]
  },
  methods: {
    getType (status) {
      if ((typeof this.gray === 'string') && status === this.gray || (this.gray instanceof Array) && this.gray.indexOf(status) !== -1) {
        return 'gray'
      } else if ((typeof this.primary === 'string') && status === this.primary || (this.primary instanceof Array) && this.primary.indexOf(status) !== -1) {
        return 'primary'
      } else if ((typeof this.success === 'string') && status === this.success || (this.success instanceof Array) && this.success.indexOf(status) !== -1) {
        return 'success'
      } else if ((typeof this.warning === 'string') && status === this.warning || (this.warning instanceof Array) && this.warning.indexOf(status) !== -1) {
        return 'warning'
      } else if ((typeof this.danger === 'string') && status === this.danger || (this.danger instanceof Array) && this.danger.indexOf(status) !== -1 ||
                 (typeof this.fail === 'string') && status === this.fail || (this.fail instanceof Array) && this.fail.indexOf(status) !== -1) {
        return 'danger'
      }
      return ''
    }
  },
  components: {
    [Tag.name]: Tag
  }
}
</script>
