export default {
  methods: {
    getFormData (data) {
      let fd = new FormData()
      this._transToFormData(fd, data)
      return fd
    },
    _transToFormData (formData, data, previousKey = '') {
      if (data instanceof Object) {
        Object.keys(data).forEach(key => {
          const value = data[key]
          if (value instanceof Object && !(value instanceof Array) && !(value instanceof File)) {
            return this._transToFormData(formData, value, key)
          }
          if (previousKey) {
            key = `${previousKey}[${key}]`
          }
          if (Array.isArray(value)) {
            value.forEach(val => {
              formData.append(`${key}[]`, val)
            })
          } else {
            if (value || value === false) {
              formData.append(key, value)
            }
          }
        })
      }
    }
  }
}
