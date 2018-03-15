<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="商店">
        <model-select v-model="form.store_id" apiPath="/stores" labelKey="name"></model-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="Images">
        <multiple-uploader v-model="form.attachment_image_ids" :attachment-images.sync="form.attachment_images"></multiple-uploader>
      </el-form-item>
      <el-form-item label="对外可见">
        <el-checkbox v-model="form.enabled"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formRef')">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleUploader from '@/components/Shared/Uploader/SingleUploader'
import MultipleUploader from '@/components/Shared/Uploader/MultipleUploader'
import ModelSelect from '@/components/Shared/Select/ModelSelect'
import form from '@/components/Shared/Mixin/form'
export default {
  mixins: [form],
  data () {
    return {
      activePanelName: 'first',
      compiledErrData: '',
      uploading: false
    }
  },
  methods: {
    imageChange (imageFile) {
      this.form.image = imageFile
    }
  },
  components: {
    ModelSelect,
    SingleUploader,
    MultipleUploader
  }
}
</script>
