<template>
  <div>
    <new ref="newComRef" @fetchData="fetchData"></new>
    <edit ref="editComRef" @fetchData="fetchData"></edit>
    <search-bar :q="q" :searches="searches">
      <template slot-scope="{search}"></template>
      <div slot="operations">
        <el-button @click="$refs['newComRef'].dialogShow = true">新增组件</el-button>
      </div>
    </search-bar>
    <s-table :tableData="tableData">
      <template slot="visible" slot-scope="{row, $index, intro}">
        <ToggleSwitch v-model="row.visible" :item="row" apiPath="/components/:id/toggle_switch?field=visible"></ToggleSwitch>
      </template>
      <template slot="operation" slot-scope="{row, $index, intro}">
        <el-button size="mini" @click="$refs['editComRef'].item = row">编辑</el-button>
      </template>
    </s-table>
    <pagination :q="q" :paginateMeta="paginateMeta"></pagination>
  </div>
</template>

<script>
import ToggleSwitch from '@/components/Shared/Switch/ToggleSwitch'
import New from './Com/New.vue'
import Edit from './Com/Edit.vue'
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
export default {
  mixins: [index, query],
  data () {
    return {
      roleEditItem: null,
      searches: [
        {
          control: 'input',
          key: 'q_email_eq',
          placeholder: '邮箱'
        }, {
          key: 'q_roles_name_eq'
        }
      ]
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getComponents(this.$route.query))
    }
  },
  mounted () {
    this.tableData = Object.assign(this.tableData, {
      dataIntros: [{
        label: '#',
        key: 'id',
        width: 100
      }, {
        label: '名称',
        key: 'name'
      }, {
        label: '设备[wap/pc]',
        key: 'devices',
        valueHandler (value) { return value.join('/') || '-' }
      }, {
        label: '单位[px/rem]',
        key: 'units',
        valueHandler (value) { return value.join('/') }
      }, {
        label: '对外可见',
        key: 'visible',
        ctrl: 'custom'
      }, {
        label: '创建时间',
        key: 'created_at',
        width: 160
      }],
      opIntro: {
        label: '操作',
        width: 120
      }
    })
  },
  components: {
    New,
    Edit,
    ToggleSwitch
  }
}
</script>
