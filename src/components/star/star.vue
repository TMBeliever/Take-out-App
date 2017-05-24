<template>
  <div class="star" :class="starType">
    <span v-for="item in starItem" :class="item" class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  var LENGTH = 5
  var ON = 'on'
  var HALF = 'half'
  var OFF = 'off'
  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      starItem() {
        var starItem = []
        var n = Math.floor(this.score * 2) / 2
        var m = n % 1 !== 0
        for (let i = 0; i < n; i++) {
          starItem.push(ON)
        }
        if (m) {
          starItem.push(HALF)
        }
        while (starItem.length < LENGTH) {
          starItem.push(OFF)
        }
        return starItem
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .star
    font-size 0
    .item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .item
        width 20px
        height: 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          background-image url("star48_on@2x.png")
        &.half
          background-image url("star48_half@2x.png")
        &.off
          background-image url("star48_off@2x.png")
    &.star-36
      .item
        width 15px
        height: 15px
        margin-right 18px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          background-image url("star36_on@2x.png")
        &.half
          background-image url("star36_half@2x.png")
        &.off
          background-image url("star36_off@2x.png")
    &.star-24
      .item
        width 10px
        height: 10px
        margin-right 15px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          background-image url("star24_on@2x.png")
        &.half
          background-image url("star24_half@2x.png")
        &.off
          background-image url("star24_off@2x.png")


</style>
