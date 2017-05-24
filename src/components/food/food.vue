<template>
  <transition name="bounce">
    <div class="food" v-show="showFood" ref="food">
      <div>
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <div class="price">￥{{food.price}}</div>
          </div>
          <div class="cartcontrol">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <div class="border"></div>
        <div class="food-info">
          <h1 class="title">商品介绍</h1>
          <span class="info">{{food.info}}</span>
        </div>
        <div class="border"></div>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
        </div>
      </div>
      <div class="back" @click="back">
        <i class="icon-reply"></i>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import Vue from 'vue'
  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2
  export default{
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartcontrol,
      ratingselect
    },
    data () {
      return {
        showFood: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: 'QAQ',
          negative: '= ='
        }
      }
    },
    methods: {
      show () {
        this.showFood = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      back () {
        this.showFood = false
      },
      buy (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      receive (type) {
        this.selectType = type
      }
    },
    created () {
      this.$on('test', this.receive)
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .back
    position fixed
    top 20px
    left 0
    z-index 500
    .icon-reply
      font-size 22px
      color #90B44B
      padding 18px

  .bounce-enter-active
    transition: all .4s ease;

  .bounce-leave-active
    transition: all .2s ease;

  .bounce-enter, .bounce-leave-active
    transform translate3d(50%, 0, 0)
    opacity 0

  .food
    position fixed
    top 0
    bottom 48px
    left 0
    background rgb(249, 247, 236)
    width 100%
    overflow hidden
    .food-content
      position relative
      .image-header
        position relative
        height 0
        width 100%
        padding-top 100%
        img
          position absolute
          top 0
          left 0
          width 100%
          height 100%
      .content
        padding 18px
        .title
          font-size 18px
          line-height 14px
          margin-bottom 16px
          color rgb(7, 17, 27)
          font-weight 600
          letter-spacing 2px
        .sellCount
          font-size 14px
          font-weight 400
        .price
          margin-top 18px
          color #90B44B
          font-size 20px
      .cartcontrol
        display flex
        position absolute
        right 16px
        bottom 12px
      .fade-leave-active
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      .fade-enter, .fade-leave-active
        transform translate3d(-50%, 50%, 0)
        opacity: 0
      .buy
        position absolute
        right 18px
        bottom 22px
        height 35px
        line-height 35px
        border-radius 14px
        background #90B44B
        color #fff
        padding 0 15px
        box-sizing border-box
        font-weight 400
        font-size 15px
        z-index 10

    .border
      width 100%
      height 16px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      border-top 1px solid rgba(7, 17, 27, 0.1)
    .food-info
      margin-bottom 5px
      .title
        padding 15px 0 0 18px
        font-size 20px
        font-weight 500
      .info
        display block
        font-size 16px
        font-weight 200
        color rgb(77, 85, 93)
        line-height 28px
        padding 10px 10px 0 26px

    .rating
      padding 18px
      .title
        line-height 19px
        margin-bottom 6px
        font-size 19px
        font-weight 500
        color rgb(7, 17, 27)

</style>
