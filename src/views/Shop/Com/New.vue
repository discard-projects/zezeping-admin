<template>
  <el-dialog title="新增" :visible.sync="dialogShow" width="95%" :close-on-click-modal="false">
    <com-form :form="form" @handler="handlerCreate"></com-form>
  </el-dialog>
</template>

<script>
import ComForm from './ComForm.vue'
import newMix from '@/components/Shared/Mixin/new'
export default {
  mixins: [newMix],
  data () {
    return {
      form: {
        name: '',
        desc: '',
        logo: null,
        category_id: '',
        region_id: ''
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
      this._handlerCreate(this.api.postShop(fd))
    }
  },
  components: {
    ComForm
  }
}
</script>
