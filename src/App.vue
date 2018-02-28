<template>
  <div id="app">
    <TopHeadMenu></TopHeadMenu>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TopHeadMenu from '@/components/Shared/TopHeadMenu'
export default {
  name: 'App',
  components: {
    TopHeadMenu
  }
}
</script>

<style>
</style>
