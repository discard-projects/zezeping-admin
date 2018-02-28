export default {
  props: ['form'],
  data () {
    return {
      rules: {}
    }
  },
  computed: {
    isNew () {
      return !this.form || !this.form.id
    }
  },
  methods: {
    resetForm (formRef) {
      this.$refs[formRef].resetFields()
    },
    submitForm (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.$emit('handler')
        }
      })
    }
  }
}
