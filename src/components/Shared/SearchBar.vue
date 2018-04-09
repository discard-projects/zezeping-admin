<template>
  <div v-if="searches && searches.length" class="wrap search-bar-component">
    <el-form ref="searchBarFormRef" :inline="true" @submit.native.prevent="search" v-if="searches && searches.length">
      <el-form-item v-for="search in searches" :label="search.label" :key="search.key" v-if="search.control">
        <el-input v-if="search.control=='input'" v-model="q[search.key]" :placeholder="search.placeholder"></el-input>
        <checkbox-select v-else-if="search.control=='checkbox-select'" v-model="q[search.key]" clearable :falseLabel="search.falseLabel" :trueLabel="search.trueLabel" :placeholder="search.placeholder"></checkbox-select>
        <el-select v-else-if="search.control=='select'" v-model="q[search.key]" :placeholder="search.placeholder || search.key" :disabled="search.disabled" :clearable="true">
          <el-option
            v-for="option in search.options"
            :key="option[search.optionsValKey || 'value']"
            :label="option[search.optionsLabelKey || 'label']"
            :value="option[search.optionsValKey || 'value']">
          </el-option>
        </el-select>
      </el-form-item>
      <slot :search="search" v-else></slot>
      <el-form-item>
        <el-button type="primary" native-type="submit">搜索</el-button>
      </el-form-item>
    </el-form>
    <span v-else></span>
    <div class="operations">
      <slot name="operations"></slot>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui'
import CheckboxSelect from '@/components/Shared/Select/CheckboxSelect'
export default {
  name: 'SearchBar',
  props: ['q', 'searches'],
  methods: {
    search () {
      let query = Object.assign({}, this.q)
      this.$router.push({ query })
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    CheckboxSelect
  }
}
</script>

<style lang="scss">
  .wrap.search-bar-component {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0;
    padding: 0;

    .el-form {
      .el-form-item {
        margin-bottom: 15px !important;
      }
    }
  }
  .scope-content {
    display: inline-block;
  }
  .operations {
    position: relative;
    padding-left: 15px;
    margin-bottom: 15px;
    border-left: 1px dashed lightgrey;

    &:empty {
      width: 0;
      height: 0;
      padding: 0 !important;
    }
  }
</style>
