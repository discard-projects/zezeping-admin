<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <h2 style="text-align: center">--- Store ---</h2>
          <el-form-item label="商店名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <model-select v-model="form.category_ids" multiple apiPath="/categories" labelKey="name"></model-select>
          </el-form-item>
          <el-form-item label="区域">
            <model-select v-model="form.region_id" apiPath="/regions" labelKey="name"></model-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="经纬度">
            <el-input v-model="form.lat" placeholder="经度"></el-input>
            <el-input v-model="form.lng" placeholder="纬度"></el-input>
          </el-form-item>
          <el-form-item label="LOGO">
            <single-uploader @change="logoChange" v-model="form.logo_thumb" ref="logoRef"></single-uploader>
          </el-form-item>
          <el-form-item label="Images">
            <multiple-uploader v-model="form.attachment_image_ids" :attachment-images.sync="form.attachment_images"></multiple-uploader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <h2 style="text-align: center">--- Store Detail ---</h2>
          <el-form-item label="电话">
            <array-input v-model="form.store_detail.phones"></array-input>
          </el-form-item>
          <el-form-item label="Wechat Qrcode">
            <single-uploader @change="wechatQrcodeChange" v-model="form.store_detail.wechat_qrcode_thumb" ref="logoRef"></single-uploader>
          </el-form-item>
        </el-col>
      </el-row>
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
    logoChange (logoFile) {
      this.form.logo = logoFile
    },
    wechatQrcodeChange (qrcodeFile) {
      this.form.store_detail.wechat_qrcode = qrcodeFile
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
