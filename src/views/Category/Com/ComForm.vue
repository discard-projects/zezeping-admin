<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="父分类">
        <model-select v-model="form.parent_id" apiPath="/categories" labelKey="name"></model-select>
      </el-form-item>
      <el-form-item label="Enabled">
        <el-switch v-model="form.enabled"></el-switch>
      </el-form-item>
      <el-form-item label="推荐">
        <el-switch v-model="form.recommended"></el-switch>
      </el-form-item>
      <el-form-item label="LOGO">
        <single-uploader @change="logoChange" v-model="form.logo_thumb" ref="logoRef"></single-uploader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formRef')">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import form from '@/components/Shared/Mixin/form'
import ModelSelect from '@/components/Shared/Select/ModelSelect'
import SingleUploader from '@/components/Shared/Uploader/SingleUploader'
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
    logoChange (logoFile) {
      this.form.logo = logoFile
    },
    publishCodeFiles () {
      let input = document.createElement('input')
      input.type = 'file'
      input.multiple = 'multiple'
      input.style.display = 'none'
      this.$el.appendChild(input)
      input.onchange = (evt) => {
        if (evt.target.files.length) {
          let fd = new FormData()
          Array.prototype.forEach.call(evt.target.files, file => {
            fd.append('files', file)
          })
          fd.append('index', this.form.index)
          this.uploading = true
          this.api.postComponentCodes(this.form.id, fd).then(res => {
            this.uploading = false
            this.$emit('refetch')
          }).catch(err => {
            this.compiledErrData = err.response.data
            this.uploading = false
          })
        }
      }
      input.click()
    }
  },
  components: {
    ModelSelect,
    SingleUploader
  }
}
</script>
