<template>
  <el-dialog title="编辑" :visible.sync="dialogShow" width="95%" :close-on-click-modal="false">
    -- {{item}} --
    <com-form :form="form" @handler="handlerUpdate" @refetch="fetchData"></com-form>
  </el-dialog>
</template>

<script>
import ComForm from './ComForm.vue'
import edit from '@/components/Shared/Mixin/edit'
import formdataMix from '@/components/Shared/Mixin/formdata'
export default {
  mixins: [edit, formdataMix],
  watch: {
    item (newVal) {
      if (newVal) {
        this.form = Object.assign({}, newVal)
      }
    }
  },
  methods: {
    handlerUpdate () {
      this._handlerUpdate(this.api.putProductCategory(this.$route.params.id, this.item.id, this.form))
    }
  },
  components: {
    ComForm
  }
}
</script>
