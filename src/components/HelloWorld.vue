<template>
  <h1>{{ msg }}</h1>
  <div @click="pareventFun" class="childParevent">子元素点击父元素</div>
  <div id="refList" ref="temRef">ref的模板的</div>
  <ul>
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs, watchEffect } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(propsPar, { emit }) {
    const temRef = ref(null);
    const con = reactive({
      name: '张何',
      ceshi: '测试ID',
      list: ['测试一', '测试二', '测试三', '测试四'],
    });
    const pareventFun = (e: object) => {
      console.log(temRef, '7777777777');
      con.list[0] = '我草变了';
      // emit('par-hand',con.name)
      emit('update:msg', '我干啊');
    };
    watchEffect(() => {
      //首次和props也会更新;
      console.log('props---来了', propsPar.msg);
    });
    // return toRefs(con)
    return {
      pareventFun,
      ...toRefs(con),
      temRef,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
