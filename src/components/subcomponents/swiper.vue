<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for绑定组件时，要加key -->
      <!-- 将来，谁使用此轮播图组件，谁为我们传递lunbotuList -->
      <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" :class="{'full': isfull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
   <!-- 为什么商品评论中的轮播图那么丑 -->
   <!-- 1. 首页中的图片，它的宽和高都是使用了100%的宽高-->
   <!-- 2. 在商品详情页中，轮播图也为100%的话就不好看 -->
   <!-- 3. 商品详情页中的轮播图，期望 高度是100%，但是宽度为自适应 -->
   <!-- 4. 经过分析，得到问题的原因：首页中的轮播图 和 详情页中的 轮播图，分歧点是 宽度到底是100%还是自适应 -->
   <!-- 5. 既然这两个 轮播图 ，其他方面没有冲突，只是宽度有分歧，那么，可以定义一个属性，让 使用轮播图的 调用者，手动指定 是否为100%宽度  -->
<script>
export default {
  props: ["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full {
  width: 100%;
}
</style>