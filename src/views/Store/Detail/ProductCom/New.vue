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
        price: '',
        image: null
      }
    }
  },
  methods: {
    handlerCreate () {
      let storeId = this.$route.params.id
      this._handlerCreate(this.api.postStoreProduct(storeId, this.getFormData(Object.assign(this.form, {product_category_id: this.dialogOptions.productCategory.id}))))
    }
  },
  components: {
    ComForm
  }
}
</script>
