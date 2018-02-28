<template>
  <el-select v-model="inValue" :multiple="multiple" @change="selectedValues" :disabled="disabled" clearable remote filterable placeholder="search keyword" :remote-method="searchRemoteOptions" :loading="searchRemoteOptionsLoading">
    <el-option v-for="option in remoteOptions" :key="option.id" :label="option.name" :value="option.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'RemoteComponentSelect',
  props: {
    value: [Array, Number, String], // options object
    selectedOptions: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inValue: this.value,
      searchRemoteOptionsLoading: false,
      remoteOptions: this.selectedOptions || []
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.inValue) {
        this.inValue = newVal
      }
    },
    inValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    searchRemoteOptions (keyword) {
      this.searchRemoteOptionsLoading = true
      this.api.getComponents({page: 1, per_page: 20, q_name_cont: keyword}).then((res) => {
        this.searchRemoteOptionsLoading = false
        this.remoteOptions = res.data.items
      })
    },
    selectedValues (values) {
      if (!(values instanceof Array)) {
        return
      }
      let allOptions = this.selectedOptions.concat(this.remoteOptions)
      this.selectedOptions.splice(0, this.selectedOptions.length)
      values.forEach((optionId) => {
        allOptions.forEach((option) => {
          if (option.id === optionId) {
            this.selectedOptions.push(option)
            return false
          }
        })
      })
    }
  }
}
</script>
