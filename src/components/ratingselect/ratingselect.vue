<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span
        class="count">50</span></span>
      <span @click="select(1,$event)" class="block positive" :class="{'active':selectType===1}">{{desc.positive}}<span
        class="count">50</span></span>
      <span @click="select(0,$event)" class="block negative" :class="{'active':selectType===0}">{{desc.negative}}<span
        class="count">50</span></span>
    </div>
    <div class="switch">
      <span @click="toggleContent" class="icon-baffled" :class="{'on':onlyContent}"></span>
      <span class="text">全部评价</span>
    </div>
    <div class="ratings-wrapper border-1px">
      <ul class="rating-list">
        <li class="rating" v-for="ratings in ratings">
          <div class="head-portrait">
            <img :src="ratings.avatar" class="avatar">
          </div>
          <div class="content">
            <span class="name">{{ratings.username}}</span>
            <span class="time">{{ratings.rateTime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2
  export default {
    data () {
      return {
        onlyContent: this.onlyContent1
      }
    },
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent1: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.onlyContent = !this.onlyContent
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../comment/stylus/mixin.styl"
  .ratingselect
    height 100%
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.2))
      font-size 0
    .block
      display inline-block
      margin-right 8px
      font-size 16px
      border-radius 7px
      padding 8px 12px
      color rgb(77, 85, 93)
      &.active
        color #fff
      .count
        font-size 12px
        margin-left 3px
      &.positive
        color #fff
        background rgba(0, 160, 220, 0.2)
        &.active
          background rgb(0, 160, 220)
      &.negative
        background rgba(77, 85, 93, 0.2)
        &.active
          background rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      font-size 12px
      color rgb(147, 153, 159)
      border-1px(rgba(7, 17, 27, 0.2))
      .icon-baffled
        display inline-block
        vertical-align top
        font-size 24px
        margin-right 4px
        &.on
        .icon-baffled
          color #E2943B
      .text
        display inline-block
        vertical-align top
        font-size 13px

    .ratings-wrapper
      .rating
        display flex
        border-1px(rgba(7, 17, 27, 0.2))
        &:last-child
          border-none
        .head-portrait
          width 30px
          height 30px
          margin 0 8px 0 -15px
          .avatar
            width 100%
            height 100%
            border-radius 50%
        .content
          .name
            font-size 15px
            font-weight 500
            margin-right 3px
            height 20px
            line-height 20px
          .time
            font-size 10px
            height 20px
            line-height 20px
</style>
