<template>
  <ul>
    <li v-for="(item,index) in attachmentImages" :key="index">
      <img :src="item.file.thumb.url" class="thumb" alt="">
    </li>
    <li>
      <div class="select-img-box" @click="$refs['file'].click()">
        <input type="file" @change="selectedFile($event.target.files)" ref="file" style="display: none">
        <i class="el-icon-plus" style="font-size: 25px"></i>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MultipleUploader',
  props: {
    value: {
      type: Array,
      require: true
    },
    attachmentImages: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectValue: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal.map(item => item.id))
        this.$emit('update:attachmentImages', newVal)
      }
    }
  },
  methods: {
    selectedFile (files) {
      if (files && files.length) {
        let fd = new FormData()
        fd.append('file', files[0])
        this.api.postAttachmentImage(fd).then(res => {
          this.selectValue = [...this.attachmentImages, res.data.item]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-img-box {
    display: inline-flex;
    width: 80px;
    height: 80px;
    text-align: center;
    border: 1px dashed #f2f2f2;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  ul {
    padding: 10px;
    li {
      display: inline-block;
      max-height: 80px;
      overflow: hidden;
      .thumb {
        width: 80px;
        height: 80px;
        border: 1px solid #f2f2f2;
      }
    }
  }
</style>
