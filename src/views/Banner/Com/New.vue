<template>
  <el-dialog title="新增" :visible.sync="dialogShow" width="95%" :close-on-click-modal="false">
    <com-form :form="form" @handler="handlerCreate"></com-form>
  </el-dialog>
</template>

<script>
import ComForm from './ComForm.vue'
import newMix from '@/components/Shared/Mixin/new'
import formdataMix from '@/components/Shared/Mixin/formdata'
export default {
  mixins: [newMix, formdataMix],
  data () {
    return {
      form: {
        name: '',
        desc: '',
        link: '',
        enabled: false
      }
    }
  },
  methods: {
    handlerCreate () {
      this._handlerCreate(this.api.postBanner(this.getFormData(this.form)))
    }
  },
  components: {
    ComForm
  }
}
</script>
