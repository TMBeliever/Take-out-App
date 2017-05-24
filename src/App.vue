<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item border-1px">
        <router-link to="/goods"><p>商品</p></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings"><p>评论</p></router-link>
      </div>
    </div>
    <router-view v-bind:seller="seller"></router-view>
  </div>
</template>
<script>
  const ERR_OK = 0
  import header from './components/header/header.vue'

  export default {
    data() {
      return {
        seller: {},
        eventHub: Object
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        res = res.body
        if (res.erron === ERR_OK) {
          this.seller = res.data
        }
      })
    },
    name: 'app',
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./comment/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex-grow: 1
      text-align: center
      background #fff
      color aquamarine

</style>
