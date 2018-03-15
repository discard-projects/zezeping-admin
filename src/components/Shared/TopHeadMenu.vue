<template>
  <div v-if="canShow" class="display-none" :class="{'display-block': canShow}">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <router-link to="/"><el-menu-item class="fl" index="Home">主页</el-menu-item></router-link>
      <router-link to="/stores"><el-menu-item class="fl" index="Store">店铺</el-menu-item></router-link>
      <router-link to="/categories"><el-menu-item class="fl" index="Category">分类</el-menu-item></router-link>
      <router-link to="/regions"><el-menu-item class="fl" index="Region">地区</el-menu-item></router-link>
      <router-link to="/banners"><el-menu-item class="fl" index="Banner">横幅</el-menu-item></router-link>
      <router-link to="/moments"><el-menu-item class="fl" index="Moment">商圈</el-menu-item></router-link>
      <div class="fr" style="line-height: 60px; margin-right: 20px;">
        <el-dropdown v-if="userInfo">
          <div style="color: #13ce66">
            <span> {{userInfo.nickname || userInfo.email}} <i class="el-icon-caret-bottom el-icon--right"></i></span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    canShow () {
      return ['Login', 'ComponentDemo'].indexOf(this.$route.name) === -1
    },
    activeIndex () {
      return this.$route.name
    }
  },
  methods: {
    handleSelect (key, keyPath) {},
    logout () {
      this.api.logout().then(() => {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }).catch(() => {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      })
    }
  }
}
</script>
