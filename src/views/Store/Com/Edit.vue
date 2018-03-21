<template>
  <el-dialog title="编辑" :visible.sync="dialogShow" width="95%" :close-on-click-modal="false">
    <com-form :form="form" @handler="handlerUpdate" @refetch="fetchData"></com-form>
  </el-dialog>
</template>

<script>
import ComForm from './ComForm.vue'
import edit from '@/components/Shared/Mixin/edit'
import formdataMix from '@/components/Shared/Mixin/formdata'
export default {
  mixins: [edit, formdataMix],
  methods: {
    fetchData () {
      this._fetchData(this.api.getStore(this.itemId))
    },
    handlerUpdate () {
      console.log(this.form)
      this._handlerUpdate(this.api.putStore(this.form.id, this.getFormData(this.form)))
    }
  },
  components: {
    ComForm
  }
}
</script>
