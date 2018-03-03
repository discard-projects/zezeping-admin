<template>
  <div class="select-img-box" @click="$refs['file'].click()">
    <input type="file" @change="selectedFile($event.target.files)" ref="file" style="display: none">
    <img v-if="imgUrl" :src="imgUrl" alt="" style="width: 100%; height: 100%">
    <i v-else class="el-icon-plus" style="font-size: 25px"></i>
  </div>
</template>

<script>
export default {
  name: 'SingleUploader',
  props: ['value'],
  data () {
    return {
      selectValue: this.value,
      imgUrl: (this.value && this.value.url) || ''
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.selectValue) {
        this.selectValue = newVal
        this.imgUrl = (this.value && this.value.url) || ''
      }
    },
    selectValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    selectedFile (files) {
      if (files && files.length) {
        this.selectValue = files[0]
        this.imgUrl = URL.createObjectURL(files[0])
        this.$emit('change', this.selectValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-img-box {
    display: inline-flex;
    width: 100px;
    height: 100px;
    text-align: center;
    border: 1px dashed #f2f2f2;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
