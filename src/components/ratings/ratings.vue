<template>
  <div class="ratings">
    <div class="content">
      <div class="content-left">
        <div class="rating">{{seller.score}}</div>
        <div class="title">综合评分</div>
        <div class="rank-rate">
          <span class="title">高于周边商家</span>
          <span class="rank">{{seller.rankRate}}</span>
        </div>
      </div>
      <div class="content-right">
        <div class="service-score">
          <span class="title">服务态度</span>
          <span class="rank">{{seller.serviceScore}}</span>
        </div>
        <div class="food-score">
          <span class="title">商品评价</span>
          <span class="rank">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-time">
          <span class="title">送达时间</span>
          <span class="time">{{seller.deliveryTime}}</span>
        </div>
      </div>
    </div>
    <div class="border"></div>
    <div class="rating"  ref="rating">
      <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc"
                    :ratings="ratings" >
      </ratingselect>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ratingselect from '../ratingselect/ratingselect.vue'
  export default{
    data () {
      return {
        showFood: false,
        selectType: 2,
        onlyContent: true,
        goods: [],
        food: [],
        ratings: [],
        desc: {
          all: '全部',
          positive: 'QAQ',
          negative: '= ='
        }
      }
    },
    components: {
      ratingselect
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.erron === 0) {
          this.goods = res.data
        }
        this.$nextTick(() => {
          this._getFoods()
        })
      })
    },
    methods: {
      _getFoods () {
        this.goods.forEach((foods) => {
          this.food.push(foods.foods)
        })
        this.food.forEach((food) => {
          food.forEach((ratings) => {
            ratings.ratings.forEach((rating) => {
              this.ratings.push(rating)
            })
          })
        })
      }
    },
    props: {
      seller: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../comment/stylus/mixin.styl"
  .ratings
    width 100%
    height 700 px
    overflow hidden
    .content
      display flex
      margin-bottom 5px
      .content-left
        flex 0 0 37%
        text-align center
        padding 8px
        border-right 1px solid rgba(125, 185, 222, 0.2)
        .rating
          padding 8px
          font-size 25px
          color #90B44B
        .title
          font-size 14px
          font-weight 400
        .rank-rate
          font-size 14px
          font-weight 350
          margin-top 8px
          letter-spacing 1px
          .title
            font-size 12px
          .rank
            color #90B44B
      .content-right
        width 100%
        text-align center
        font-size 15px
        font-weight 400
        padding 6px
        .service-score
          margin-top 18px
          .rank
            color #90B44B
        .food-score
          margin-top 5px
          .rank
            color #90B44B
        .delivery-time
          margin-top 5px
          .time
            color #90B44B
            &:after
              content '.'
              visibility hidden

    .border
      width 100%
      height 10px
      background #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      border-top 1px solid rgba(7, 17, 27, 0.1)
    .rating
      padding 18px
      overflow hidden
</style>
