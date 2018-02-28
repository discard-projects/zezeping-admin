<template>
  <div v-if="form">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="设备">
        <el-checkbox-group v-model="form.devices">
          <el-checkbox label="pc"></el-checkbox>
          <el-checkbox label="wap"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单位">
        <el-checkbox-group v-model="form.units">
          <el-checkbox label="px"></el-checkbox>
          <el-checkbox label="rem"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="对外可见">
        <el-checkbox v-model="form.visible"></el-checkbox>
      </el-form-item>
    </el-form>
    <el-row :gutter="50" v-if="!isNew">
      <el-col :span="12">
        <div>发布源码</div>
        <!--<input type="file" multiple @change="publishCodeFiles($event)">-->
        <el-button type="primary" @click="publishCodeFiles">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <div style="color: red">
          {{compiledErrData}}
        </div>
      </el-col>
      <el-col :span="12" v-if="!isNew">
        <div>发布列表</div>
        <el-card v-for="(componentCode,index) in form['component_codes']" :key="index">
          <div slot="header">
            <span>{{componentCode['created_time']}}</span>
          </div>
          <div v-if="componentCode['px_dist_codes'].length">
            <div style="font-size: 12px; color: lightblue">----------- PX ------</div>
            <ul>
              <li v-for="(px_dist_code,index) in componentCode['px_dist_codes']" :key="index">{{ px_dist_code }}</li>
            </ul>
          </div>
          <div v-if="componentCode['rem_dist_codes'].length">
            <div style="font-size: 12px; color: lightblue">----------- REM ------</div>
            <ul>
              <li v-for="(rem_dist_code,index) in componentCode['rem_dist_codes']" :key="index">{{ rem_dist_code }}</li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs v-model="activePanelName" v-if="!isNew">
      <el-tab-pane label="使用方法" name="first">
        <mavon-editor v-model="form.usage"/>
      </el-tab-pane>
      <el-tab-pane label="demo" name="second">
        <vuep v-model="form.demo_code" :scope="scopeMe"></vuep>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="submitForm('formRef')">{{ isNew ? '新增' : '更新' }}</el-button>
  </div>
</template>

<script>
import form from '@/components/Shared/Mixin/form'
import RemoteComponentSelect from './RemoteComponentSelect.vue'
import Webco from '@/components/Shared/webco/webco-vue/lib/webco.vue'
export default {
  mixins: [form],
  data () {
    return {
      scopeMe: { Webco },
      activePanelName: 'first',
      compiledErrData: '',
      uploading: false
    }
  },
  methods: {
    publishCodeFiles () {
      let input = document.createElement('input')
      input.type = 'file'
      input.multiple = 'multiple'
      input.style.display = 'none'
      this.$el.appendChild(input)
      input.onchange = (evt) => {
        if (evt.target.files.length) {
          let fd = new FormData()
          Array.prototype.forEach.call(evt.target.files, file => {
            fd.append('files', file)
          })
          fd.append('index', this.form.index)
          this.uploading = true
          this.api.postComponentCodes(this.form.id, fd).then(res => {
            this.uploading = false
            this.$emit('refetch')
          }).catch(err => {
            this.compiledErrData = err.response.data
            this.uploading = false
          })
        }
      }
      input.click()
    }
  },
  components: {
    RemoteComponentSelect
  }
}
</script>
