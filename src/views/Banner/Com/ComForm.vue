<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <single-uploader @change="imageChange" v-model="form.image_thumb" ref="logoRef"></single-uploader>
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
import ArrayInput from '@/components/Shared/Input/ArrayInput'
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
    MultipleUploader,
    ArrayInput
  }
}
</script>
