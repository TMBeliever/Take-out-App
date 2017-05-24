<template>
  <div class="cartcontrol">
    <div class="decrease">
      <div class="cart-decrease icon-minus" v-show="food.count>0" @click.stop="decreaseCart"></div>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="add">
      <div class="cart-add icon-plus" @click.stop="addCart"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        this.food.count--
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .decrease
      display inline-block
      box-sizing border-box
      border 1px solid #90B44B
      border-radius 50%
      .cart-decrease
        font-size 5px
        padding 9px
        color #90B44B
    .cart-count
      display inline-block
      font-size 15px
      margin 0 6px
      font-weight 400
    .add
      display inline-block
      background #90B44B
      border-radius 50%
      border 1px solid #90B44B
      .cart-add
        font-size 5px
        color #fff
        padding 9px
</style>
