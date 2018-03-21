<template>
  <div>
    <el-select v-model="selectValue" filterable remote :placeholder="placeholder" :multiple="multiple" :remote-method="remoteMethod" :loading="loading" style="width: 90%">
      <el-option v-for="item in items" :key="item.id" :label="item[labelKey]" :value="item.id"></el-option>
    </el-select>
  </div>
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
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Search'
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
    remoteMethod (query, isFirst) {
      if (!isFirst) {
        this.cusAxios.get(this.realApi, {params: {[`q_${this.labelKey}_cont`]: query}}).then(res => {
          this.loading = false
          this.items = res.data.items
        }).catch(() => {
          this.loading = false
        })
      } else {
        let ids = this.multiple ? this.value : [this.value]
        this.cusAxios.get(this.realApi, {params: {[`q_id_in_any`]: ids}}).then(res => {
          if (res.data.items) {
            this.items = res.data.items
          }
        })
      }
    }
  },
  mounted () {
    this.remoteMethod('', true)
  }
}
</script>

<style lang="css">
</style>
