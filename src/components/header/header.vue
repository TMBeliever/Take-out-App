<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div v-if="seller.supports" class="support"></div>
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description+"/"+seller.deliveryTime+"分钟送达"}}
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span>{{"公告："+seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" class="img">
    </div>
    <transition name="fade">
      <div v-show="Detail" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="support in seller.supports" class="support">
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="close">
          <i class="icon-point-right" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        Detail: false
      }
    },
    methods: {
      showDetail() {
        this.Detail = true
      },
      closeDetail() {
        this.Detail = false
      }
    },
    components: {
      star
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .header
    position relative
    color #fff
    background rgba(7, 17, 27, 0.4)
    .content-wrapper
      padding 24px 12px 18px 16px
      font-size 0
      .avatar
        display inline-block
      .content
        margin-left 16px
        display inline-block
        font-size 14px
        .title
          margin 2px 0 8px 0
          font-size 16px
          font-weight 400
          .brand
            display inline-block
            width 30px
            height 18px
            vertical-align: top
            background-size 30px 18px
            background-image: url("brand@2x.png")
        .support
          margin-top 4px
          .icon
            display inline-block
            width 12px
            height 12px
            margin-left 4px
            background-size 12px 12px
            background-repeat no-repeat
            background-image url("decrease_1@3x.png")
    .bulletin-wrapper
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 13px
    .background
      position absolute
      top: 0
      width: 100%
      height 100%
      z-index -1
      filter: blur(10px)
      .img
        width 100%
        height 100%
    .detail
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      overflow auto
      background rgba(0, 0, 0, 0.7)
      -webkit-backdrop-filter blur(10px)
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
      background rgba(0, 0, 0, 0.7)
    .fade-enter, .fade-leave-active
      opacity: 0
      background rgba(0, 0, 0, 0.5)
    .detail-wrapper
      min-height 100%
      width 100%
      .main
        margin-top 64px
        padding-bottom 64px
        .name
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        .title
          display: flex
          width 80%
          margin 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top -6px
            border-bottom 1px solid rgba(144, 180, 75, 0.8)
          .text
            padding 0 12px
            font-size 14px
            font-weight 700
        .supports
          width 80%
          margin 0 auto
          .support
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0
            .text
              font-size 15px
              line-height 12px
        .bulletin
          width 80%
          margin auto
          line-height 25px
          .content
            padding 0 12px
            font-size 18px
    .close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear: both
      font-size 28px


</style>
