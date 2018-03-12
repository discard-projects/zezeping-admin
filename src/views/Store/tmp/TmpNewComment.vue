<template>
  <div>
    <el-button size="mini" @click="dialogShow = true">新增假评论</el-button>
    <el-dialog title="新增" :visible.sync="dialogShow" width="75%" :close-on-click-modal="false" append-to-body>
      <com-form :form="form" @handler="handlerCreate"></com-form>
    </el-dialog>
  </div>
</template>

<script>
import ComForm from './ComForm.vue'
import newMix from '@/components/Shared/Mixin/new'
import formdataMix from '@/components/Shared/Mixin/formdata'
export default {
  mixins: [newMix, formdataMix],
  props: {
    store: {
      require: true
    }
  },
  data () {
    return {
      form: {
        tmp_nickname: '',
        rank: 0,
        content: '',
        anonymous: false,
        tmp_avatar: null,
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
      this._handlerCreate(this.api.postStoreComment(this.store.id, this.getFormData(this.form)))
    }
  },
  components: {
    ComForm
  }
}
</script>
