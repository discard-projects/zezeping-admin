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
    <!--<s-table :tableData="tableData" tableType="expand">-->
      <!--<template slot="expand" slot-scope="{row, $index}">-->
        <!--<s-table :tableData="{data: row.children, dataIntros: tableData.dataIntros}"></s-table>-->
      <!--</template>-->
      <!--<template slot="operation" slot-scope="{row, $index, intro}">-->
        <!--<el-button size="mini" @click="$refs['editComRef'].item = row">编辑</el-button>-->
      <!--</template>-->
    <!--</s-table>-->
    <el-card v-for="(oneData, index) in tableData.data" :key="index">
      <sortable-tree :data="oneData" mixinParentKey="$parent" @changePosition="changePosition" :dragEnable="true" closeStateKey="$foldClose">
        <template slot-scope="{item}">
          <div class="custom-tree-content" :class="{'exitChild': item.children && item.children.length}">
            <span v-if="item['$foldClose'] && item.children && item.children.length" @click="changeState(item)">▶</span>
            <span v-else-if="!item['$foldClose'] && item.children && item.children.length" @click="changeState(item)">▼</span>
            <span>{{item.name}}</span>
            <ToggleSwitch v-model="item.enabled" :item="item" apiPath="/categories/:id/toggle_switch?field=enabled" on-text="Enabled"></ToggleSwitch>
            <el-button size="mini" @click="$refs['editComRef'].item = item">编辑</el-button>
            <ToggleSwitch v-model="item.recommended" :item="item" apiPath="/categories/:id/toggle_switch?field=recommended" on-text="Recommended"></ToggleSwitch>
          </div>
        </template>
      </sortable-tree>
    </el-card>
    <pagination :q="q" :paginateMeta="paginateMeta"></pagination>
  </div>
</template>

<script>
import SortableTree from '@/components/Shared/SortableTree'
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
          type: String,
          placeholder: '名称'
        }
      ]
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getCategories(this.$route.query))
    },
    // tree
    consoleData () {
      console.log(this.treeData)
    },
    changeState (item) {
      this.$set(item, '$foldClose', !item['$foldClose'])
    },
    changePosition (option) {
      console.log('changePosition: ', option)
      this.api.putCategory(option.data.id, {parent_id: option.afterParent.id}).then(res => {
        this.fetchData()
      }).catch(() => {
        this.fetchData()
      })
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
    ToggleSwitch,
    SortableTree
  }
}
</script>

<style lang="scss" scoped>
  .custom-tree-content {
    position: relative;
    top: 2px;
    z-index: 1;
    &.exitChild {
      margin-left: -7px;
    }
  }
</style>
