<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格(P)">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="分类" v-if="form.id">
        <model-select v-model="form.product_category_id" :apiPath="`/stores/${this.$route.params.id}/product_categories`" labelKey="name"></model-select>
      </el-form-item>
      <el-form-item label="图片">
        <single-uploader @change="imageChange" v-model="form.image_thumb"></single-uploader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formRef')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleUploader from '@/components/Shared/Uploader/SingleUploader'
import form from '@/components/Shared/Mixin/form'
import ModelSelect from '@/components/Shared/Select/ModelSelect'
export default {
  mixins: [form],
  methods: {
    imageChange (imageFile) {
      this.form.image = imageFile
    }
  },
  components: {
    SingleUploader,
    ModelSelect
  }
}
</script>
