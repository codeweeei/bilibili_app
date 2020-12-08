<template>
  <div class="logintext">
    <van-field  
    :label="label"  
    :type="type" 
    :placeholder="placeholder" 
    :rule="rule"
    v-model="content"/>
  </div>
</template>

<script>
export default {
  name:'LoginText',
  props:["label","type","placeholder","rule"],
  data() {
    return {
      content:''
    }
  },
  watch: {
    //可以对data里的数据进行监听
    content(){
      // this.$emit('imputChange',this.content)
      this.regtest()
    }
  },
  methods: {
    regtest(){
      const Rue =new RegExp(this.rule)
        if(Rue.test(this.content)){
          this.$emit('imputChange',this.content) 
        }
    }
  },
}
</script>

<style lang="less">
  .logintext{
    margin: 4.688vw 0;
  }
</style>