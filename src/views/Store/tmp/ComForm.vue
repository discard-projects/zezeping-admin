<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="150px">
      <el-form-item label="昵称(匿名填邮箱)">
        <el-input v-model="form.tmp_nickname"></el-input>
      </el-form-item>
      <el-form-item label="评分">
        <el-rate v-model="form.rank" show-text style="line-height: 44px"></el-rate>
      </el-form-item>
      <el-form-item label="评论">
        <el-input v-model="form.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="LOGO">
        <single-uploader @change="avatarChange" v-model="form.tmp_avatar" ref="avatarRef"></single-uploader>
      </el-form-item>
      <el-form-item label="Images">
        <multiple-uploader v-model="form.attachment_image_ids" :attachment-images.sync="form.attachment_images"></multiple-uploader>
      </el-form-item>
      <el-form-item label="匿名">
        <el-switch v-model="form.anonymous"></el-switch>
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
    avatarChange (avatarFile) {
      this.form.tmp_avatar = avatarFile
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
