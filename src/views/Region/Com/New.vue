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
        name: ''
      }
    }
  },
  methods: {
    handlerCreate () {
      this._handlerCreate(this.api.postRegion(this.form))
    }
  },
  components: {
    ComForm
  }
}
</script>
