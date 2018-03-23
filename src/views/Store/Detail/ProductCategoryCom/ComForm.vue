<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formRef')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import form from '@/components/Shared/Mixin/form'
export default {
  mixins: [form]
}
</script>
