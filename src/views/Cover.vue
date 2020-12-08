<template>
  <div @click="pathPush" v-if="detailItem">
    <div class="detail_item">
      <div class="detail_item_card">
        <img :src="detailItem.img" alt="" style="width:100%">
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
      background:linear-gradient(0,rgba(0,0,0,.85),transparent) ;
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
  .detail_item p{
    font-size: 3.2vw;
    padding-top: 1.333vw;
  }
}
  
</style>