<template>
  <div>
    <new ref="newComRef" @fetchData="fetchData"></new>
    <edit ref="editComRef" @fetchData="fetchData"></edit>
    <search-bar :q="q" :searches="searches">
      <template slot-scope="{search}"></template>
      <div slot="operations">
        <el-button @click="$refs['newComRef'].dialogShow = true">新增</el-button>
      </div>
    </search-bar>
    <s-table :tableData="tableData">
      <template slot="image" slot-scope="{row, $index, intro}">
        <img :src="row.image.thumb.url" alt="" style="max-height: 40px">
      </template>
      <template slot="enabled" slot-scope="{row, $index, intro}">
        <ToggleSwitch v-model="row.enabled" :item="row" column="enabled" apiPath="/banners/:id/toggle_switch?field=enabled"></ToggleSwitch>
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
          key: 'q_name_cont',
          placeholder: '名称'
        }
      ]
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getBanners(this.$route.query))
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
        label: '描述',
        key: 'desc'
      }, {
        label: '跳转链接',
        key: 'link'
      }, {
        label: '图片',
        key: 'image',
        ctrl: 'custom'
      }, {
        label: 'Enabled',
        key: 'enabled',
        ctrl: 'custom'
      }, {
        label: '创建时间',
        key: 'created_time',
        width: 160
      }, {
        label: '更新时间',
        key: 'updated_time',
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
