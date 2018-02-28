<template>
  <webco-preview-component v-model="demoCode">

  </webco-preview-component>
</template>

<script>
import WebcoPreviewComponent from '@/components/Shared/webco/webco-preview-component/webco-preview-component.vue'
export default {
  data () {
    return {
      demoCode: ''
    }
  },
  mounted () {
    this.api.getComponemtDomoCode(this.$route.params.id).then(res => {
      this.demoCode = res.data['demo_code']
    })
  },
  components: {
    'webco-preview-component': WebcoPreviewComponent
  }
}
</script>
