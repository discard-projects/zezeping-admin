<template>
  <el-switch v-model="inValue" @change="changeValue" :active-text="onText" :inactive-text="offText" :active-color="onColor" :inactive-color="offColor" :disabled="disabled || loading" ></el-switch>
</template>

<script>
import { Switch } from 'element-ui'
import handleApi from '@/libs/utils/handleApi'
export default {
  name: 'ToggleSwitch',
  props: {
    value: {
      require: true,
      default: false
    },
    item: {
      require: true,
      type: Object
    },
    apiPath: {
      require: false
    },
    returnKey: {
      require: false
    },
    onText: {
      require: false
    },
    offText: {
      require: false
    },
    onColor: {
      require: false
    },
    offColor: {
      require: false
    },
    disabled: {
      require: false,
      default: false
    },
    shouldConfirm: {
      require: false,
      default: false
    }
  },
  data () {
    return {
      inValue: !!this.value,
      loading: false
    }
  },
  watch: {
    value (newVal) {
      if (!!newVal !== this.inValue) {
        this.inValue = !!newVal
      }
    },
    inValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    changeValue (newVal) {
      if (this.shouldConfirm) {
        this.$confirm('Are you sure change status?', 'confirm', {
          confirmButtonText: 'sure',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          this.sendChange(newVal)
        }).catch(() => {
          this.item.enabled = !this.item.enabled
        })
      } else {
        this.sendChange(newVal)
      }
    },
    sendChange (newVal) {
      let realApi = handleApi(this.apiPath, this.item)
      this.loading = true
      this.cusAxios.put(realApi).then(res => {
        this.loading = false
        this.$emit('afterChangeTrigger', newVal)
        this.inValue = res.data.value
      }).catch(() => {
        this.loading = false
        this.inValue = !this.inValue
      })
    }
  },
  components: {
    [Switch.name]: Switch
  }
}
</script>
