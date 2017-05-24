<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper " ref="menuwrapper">
        <ul>
          <li v-for="(item,index) in goods" class="item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
            <span class="text border-1px">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodswrapper">
        <div class="foods">
          <ul>
            <li v-for="item in goods" class="food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" class="food-item border-1px" @click="selectedFood(food,$event)">
                  <div class="icon">
                    <img :src="food.icon" width="60">
                  </div>
                  <div class="content">
                    <div class="name">
                      <h2 class="foodName">{{food.name}}</h2>
                      <p class="desc">{{food.description}}</p>
                    </div>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率 {{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span>￥{{food.price}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
      <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"
                :select-foods="selectFoods"></shopcart>
    </div>
    <food :food="selectFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import food from '../food/food.vue'
  var ERRON = 0
  export default{
    components: {
      shopcart,
      cartcontrol,
      food
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectFood: {}
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((food) => {
          food.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.erron === ERRON) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 350)  // 选择目录相对应的物品和过程时间。
      },
      selectedFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectFood = food
        this.$refs.food.show()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../comment/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 176px
    bottom 40px
    width 100%
    .menu-wrapper
      flex 0 0 80px
      background #f3f5f7
      overflow hidden
      .item
        display table
        height 54px
        width 56px
        padding 0 12px
        &.current
          font-weight 700
          position relative
          margin-top -1px
          z-index 10px
          background #fff
          .text
            border-none()
        .text
          font-size 13px
          width 56px
          display table-cell
          border-1px(rgba(7, 17, 27, 0.1))
          vertical-align middle
    .foods-wrapper
      overflow hidden
      .title
        padding-left 12px
        height: 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            .foodName
              margin 2px 0 8px 0
              height 14px
              line-height 14px
              font-size 15px
              font-weight 600
              color rgb(7, 17, 27)
            .desc
              line-height 15px
              font-size 14px
              color rgb(147, 153, 159)
              margin-bottom 8px
              padding-top 1px
          .extra
            font-size 14px
          .price
            margin-top 5px
            color red
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 5px
</style>
