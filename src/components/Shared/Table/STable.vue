<template>
  <el-table :data="tableData.data" v-loading.body="tableData.loading" resizable border stripe>
    <el-table-column :type="tableType" v-if="tableType">
      <template slot-scope="{row, $index}">
        <slot name="expand" :row="row" :$index="$index"></slot>
      </template>
    </el-table-column>
    <el-table-column v-for="(intro,index) in tableData.dataIntros" :key="index" :label="intro['label']" :width="intro.width">
      <template slot-scope="{row, $index}">
        <div v-if="intro.ctrl == 'custom'">
          <slot :name="intro.key" :row="row" :$index="$index" :intro="intro"></slot>
        </div>
        <div v-else>
          <el-button v-if="intro.ctrl === 'link'" size="small" type="text" @click="intro['click'](row, $index)">{{ intro['valueHandler'] && safeValueHandler(intro['valueHandler'], [row[intro['key']], row, index]) || intro['value'] || row[intro['key']] }}</el-button>
          <span v-else>{{ intro['valueHandler'] && safeValueHandler(intro['valueHandler'], [row[intro['key']], row, index]) || intro['value'] || row[intro['key']] }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column v-if="tableData.opIntro" :fixed="tableData.opIntro.fixed || 'right'" :label="tableData.opIntro['label']" :width="tableData.opIntro['width']">
      <template slot-scope="{row, $index}">
        <slot name="operation" :row="row" :$index="$index" :intro="tableData.opIntro"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { Table } from 'element-ui'
import StatusTag from '@/components/Shared/StatusTag'
export default {
  name: 'STable',
  props: {
    tableType: {
      type: String,
      default: ''
    },
    tableData: {
      type: Object,
      default: () => { return {} },
      data: {
        type: [Array],
        default: () => { return [] }
      },
      dataIntros: {
        type: [Array],
        require: true
      },
      opIntro: {
        type: [Object]
      }
    }
  },
  methods: {
    safeValueHandler (handler, args) {
      try { return handler.apply(handler, args) } catch (err) { return args[0] }
    }
  },
  components: {
    [Table.name]: Table,
    [StatusTag.name]: StatusTag
  }
}
</script>
