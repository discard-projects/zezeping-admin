<template>
  <el-dialog title="编辑" :visible.sync="dialogShow" width="95%" :close-on-click-modal="false">
    <com-form :form="form" @handler="handlerUpdate" @refetch="fetchData"></com-form>
  </el-dialog>
</template>

<script>
import ComForm from './ComForm.vue'
import edit from '@/components/Shared/Mixin/edit'
export default {
  mixins: [edit],
  methods: {
    fetchData () {
      this._fetchData(this.api.getShop(this.itemId))
    },
    handlerUpdate () {
      let fd = new FormData()
      Object.keys(this.form).forEach(key => {
        if (this.form[key]) {
          fd.append(key, this.form[key])
        }
      })
      this._handlerUpdate(this.api.putShop(this.form.id, fd))
    }
  },
  components: {
    ComForm
  }
}
</script>
