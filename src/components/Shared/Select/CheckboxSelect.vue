<template>
  <el-select v-model="selectValue" :disabled="disabled" :placeholder="placeholder" :clearable="clearable">
    <el-option
      v-for="item in options" :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import {Select, Option} from 'element-ui'
export default {
  name: 'CheckboxSelect',
  props: ['value', 'disabled', 'placeholder', 'clearable', 'trueLabel', 'falseLabel'],
  data () {
    return {
      options: [{
        value: true,
        label: this.trueLabel || 'true'
      }, {
        value: false,
        label: this.falseLabel || 'false'
      }],
      selectValue: this.value
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.selectValue) {
        this.selectValue = newVal
      }
    },
    selectValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  }
}
</script>
