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
        open_time_desc: '',
        logo: null,
        category_ids: [],
        region_id: '',
        address: '',
        attachment_image_ids: [],
        attachment_images: [],
        store_detail: {
          phones: []
        },
        lat: '',
        lng: ''
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
