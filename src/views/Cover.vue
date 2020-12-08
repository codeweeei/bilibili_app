<template>
  <div @click="pathPush" v-if="detailItem">
    <div class="detail_item">
      <div class="detail_item_card">
        <img :src="detailItem.img" alt="图片已失效" onerror="this.classList.add('error');" >
        <div class="detail_item_card_holder">
          <span class="left"><i class="icomoon icon-play2"></i>1233</span>
          <span class="right"><i class="icomoon icon-file-text"></i>{{!detailItem.commentlen?66:detailItem.commentlen}}</span>
        </div>
      </div>
      <p>{{detailItem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'Cover',
  props:['detailItem'],
  methods: {
    pathPush(){
    this.$router.push(`/article/${this.detailItem.id}`)
    }
  },
}
</script>

<style lang="less">
.detail_item{
  padding: 1.333vw 0.8vw;
  .detail_item_card{
    img{
      width: 100%;
      height: 24.533vw;
    }
    //设置图片加载错误时的样式
    img.error{
      display: inline-block;
      transform: scale(1);
      content: '';
      color: transparent;
    }
    img.error::before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: #f5f5f5 url("../assets/picture_lose.svg") no-repeat center / 80% 80%;
    }
    img.error::after {
      content: attr(alt);
      position: absolute;
      left: 0; bottom: 0;
      width: 100%;
      line-height: 2;
      background-color: rgba(0,0,0,.15);
      color: white;
      font-size: 12px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    display: flex;
    position: relative;
    overflow: hidden;
    .detail_item_card_holder{
      position: absolute;
      bottom: 0;
      left: 0;
      color: white;
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 1.333vw 1.6vw;
      font-size: 3.2vw;
      background:linear-gradient(0,rgba(0,0,0,.75),transparent) ;
      box-sizing: border-box;
      text-align: center;
      vertical-align: middle;
      .left .icomoon{
        margin-right: 0.8vw;
      }
      .right .icomoon{
        margin-right: 0.8vw;
      }
    }
  }
  p{
    font-size: 3.611vw;
    // 视频标题文本两行溢出后省略号显示
    text-overflow: -o-ellipsis-lastline;
    padding-top: 1.333vw;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
  
</style>