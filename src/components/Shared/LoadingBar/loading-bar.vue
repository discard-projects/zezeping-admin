<template>
  <div :class="classes" class="fade" :style="outerStyles" v-show="show">
    <div :class="innerClasses" class="fade" :style="styles"></div>
  </div>
</template>
<script>
const prefixCls = 'ivu-loading-bar'

export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    failedColor: {
      type: String,
      default: 'error'
    },
    height: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      percent: 0,
      // color: 'primary',
      // failedColor: 'error',
      // height: 2,
      status: 'success',
      show: false
    }
  },
  computed: {
    classes () {
      return `${prefixCls}`
    },
    innerClasses () {
      return [
        `${prefixCls}-inner`,
        {
          [`${prefixCls}-inner-color-primary`]: this.color === 'primary' && this.status === 'success',
          [`${prefixCls}-inner-failed-color-error`]: this.failedColor === 'error' && this.status === 'error'
        }
      ]
    },
    outerStyles () {
      return {
        height: `${this.height}px`
      }
    },
    styles () {
      let style = {
        width: `${this.percent}%`,
        height: `${this.height}px`
      }

      if (this.color !== 'primary' && this.status === 'success') {
        style.backgroundColor = this.color
      }

      if (this.failedColor !== 'error' && this.status === 'error') {
        style.backgroundColor = this.failedColor
      }

      return style
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade {
    transition: all .3s ease;
  }

  .ivu-loading-bar {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1050;
  }
</style>
