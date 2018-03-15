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
        store_id: '',
        content: '',
        attachment_image_ids: [],
        attachment_images: [],
        enabled: false
      }
    }
  },
  methods: {
    handlerCreate () {
      this._handlerCreate(this.api.postMoment(this.getFormData(this.form)))
    }
  },
  components: {
    ComForm
  }
}
</script>
