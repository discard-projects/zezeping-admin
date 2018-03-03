<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="商店名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <model-select v-model="form.category_id" apiPath="/categories" labelKey="name"></model-select>
      </el-form-item>
      <el-form-item label="区域">
        <model-select v-model="form.region_id" apiPath="/regions" labelKey="name"></model-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <single-uploader @change="logoChange" v-model="form.logo_url" style="width: 100px; height: 100px" ref="logoRef"></single-uploader>
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
    logoChange (logoFile) {
      this.form.logo = logoFile
    }
  },
  components: {
    ModelSelect,
    SingleUploader
  }
}
</script>
