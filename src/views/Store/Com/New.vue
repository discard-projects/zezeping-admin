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
        logo: null,
        category_id: '',
        region_id: '',
        attachment_image_ids: [],
        attachment_images: []
      }
    }
  },
  methods: {
    handlerCreate () {
      let fd = new FormData()
      Object.keys(this.form).forEach(key => {
        if (this.form[key]) {
          fd.append(key, this.form[key])
        }
      })
      this._handlerCreate(this.api.postStore(this.getFormData(this.form)))
    }
  },
  components: {
    ComForm
  }
}
</script>
