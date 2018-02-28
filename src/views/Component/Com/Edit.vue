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
      this._fetchData(this.api.getComponent(this.itemId))
    },
    handlerUpdate () {
      this._handlerUpdate(this.api.putComponent(this.form.id, this.form))
    }
  },
  components: {
    ComForm
  }
}
</script>
