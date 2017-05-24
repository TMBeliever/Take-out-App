<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="count" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalCount>0}">￥{{totalprice}}</div>
          <div class="desc">配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{'highlight':totalprice>minPrice}" @click.stop="pay">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listshow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listcontent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fold">
      <div class="fill" v-show="listshow" @click="hidden"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import BScroll from 'better-scroll'
  export default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data() {
      return {
        fold: true
      }
    },
    computed: {
      totalprice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count
        })
        return total
      },
      payDesc() {
        if (this.totalprice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalprice < this.minPrice) {
          let diff = this.minPrice - this.totalprice
          return `还差￥${diff}元`
        } else {
          return '去结算'
        }
      },
      listshow() {
        if (!this.totalprice) {
          this.fold = true
        }
        let show = !this.fold
        if (show) {
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.listcontent, {
                click: true
              })
            })
          } else {
            this.$nextTick(() => {
              this.scroll.refresh()
            })
          }
        }
        return show
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((item) => {
          item.count = 0
        })
      },
      pay() {
        if (this.totalprice < this.minPrice) {
          return
        }
        window.alert(`需支付￥${this.totalprice + this.deliveryPrice}元`)
      },
      hidden() {
        this.fold = !this.fold
      }
    },
    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../comment/stylus/mixin.styl"
  .fill
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.6)
    backdrop-filter blur(10px)
    z-index 50

  .fold-enter-active, .fold-leave-active
    transition: opacity 0.6s;

  .fold-enter, .fold-leave-active
    opacity 0

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 60
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          width 56px
          height 56px
          margin 0 12px
          padding 6px
          box-sizing border-box
          background #000
          border-radius 50%
          .logo
            background #2b343c
            width 100%
            height 100%
            border-radius 50%
            text-align center
            &.highlight
              background #90B44B
            .icon-cart
              line-height 44px
              font-size 20px
              color #80858a
              &.highlight
                color #fff

          .count
            position absolute
            top 0
            right 0
            background rgb(240, 20, 20)
            width 24px
            height 16px
            line-height 16px
            text-align center
            font-size 9px
            font-weight 700
            border-radius 40%
            color #fff
            box-shadow 0 4px 8px rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right: 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
      .content-right
        flex 0 0 120px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background #2b333b
          &.highlight
            background #90B44B
            color #fff
            font-weight 700
            font-size 15px
    .fold-enter-active, .fold-leave-active
      transition: opacity 0.6s;
    .fold-enter, .fold-leave-active
      opacity 0
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform: translate3d(0, -100%, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          font-size 14px
          float left
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 12px
            color rgb(7, 17, 27)
            font-weight 400
          .price
            position absolute
            right 100px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700px
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 3px
            line-height 25px


</style>
