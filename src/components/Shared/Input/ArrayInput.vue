<template>
  <div>
    <ul>
      <li v-for="(oneValue,index) in value" :key="index">
        <el-input :type="type" v-model="value[index]">
          <el-button slot="append" icon="el-icon-minus" @click="value.splice(index, 1)"></el-button>
        </el-input>
      </li>
      <li>
        <el-button icon="el-icon-plus" @click="value.push('')"></el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      require: true,
      type: Array
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>
