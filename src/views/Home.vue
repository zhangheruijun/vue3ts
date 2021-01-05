<template>
  <div id="teleportId"></div>
  <img alt="Vue logo" src="../assets/logo.png" />
  <!-- v-model:msg="testValue" 类似2.0中的 :msg.sync='testValue';而且可以添加多个 -->
  <HelloWorld
    v-model:msg="testValue"
    v-model:msgn="testValue"
    @par-hand="handFun"
  />
  {{ num }}
  <div @click="btnFun" v-custInst="custInst">三大发顺丰</div>
  <div>{{ age }}------{{ dataList }}</div>
  <input v-model="changsText" type="text" />
  <!-- <div>{{ shallReact._a }}</div>
    <div>{{ shallReact.a._b }}</div>
    <div>{{ shallReact.a.b.d }}</div> -->
  <sha />
  <!-- <router-view class="zhanghe"></router-view> -->
  <!-- <input type="text" v-model='atest'> 原生的input可以直接用v-model -->
  <!-- 页面中也可以用全局自定义的方法、属性 -->
  <div class="mp">{{ $cust }}</div>
  <zhang />
  <he />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  watch,
  computed,
  onMounted,
  toRefs,
  isRef,
  getCurrentInstance,
  provide,
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import sha from "./shallowReactive_shallowRef.vue";
import zhang from "./zhang.vue";
import he from "./he.vue";
import { useStore } from "vuex"; //vuex的使用
export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    sha,
    zhang,
    he,
  },
  //setup只能是一个同步的函数，不能是异步的函数,所以setup前面不能加async
  setup() {
    const { ctx }: any = getCurrentInstance();
    //provide的用法
    provide("pcd", "home传provide");
    onMounted(() => {
      console.log("生命周期的mounted");
      console.log(ctx);
      console.log(ctx.$router, "路由跳转路由");
      console.log(ctx.$router.currentRoute.value, "获取当前路由");
    });
    const changsText = ref("双向绑定");
    const num = ref(20); //数组、对象、字符串个都可以
    console.log(isRef(num)); //isRef来判断是不是ref
    const zhang: any = reactive({
      //要重新赋值界面才能更新
      age: 18,
      name: "周杰伦",
      dataList: computed(() => zhang.age + 3),
      testValue: "测试watchEffect",
    });
    const btnFun = () => {
      zhang.age = 545;
      zhang.name = "天王";
      num.value = 50;
      zhang.testValue = "我靠变了";
    };
    const handFun = (con: string) => {
      console.log(con);
    };
    watch(
      //监听多个属性
      [() => zhang.age, () => zhang.name, changsText],
      (
        [newValue, newName, changsTextNew],
        [oldValue, oldName, changsTextOld]
      ) => {
        console.log(
          newValue,
          newName,
          changsTextNew,
          oldValue,
          oldName,
          changsTextOld
        );
      },
      {
        immediate: true,
        deep: true,
      }
    );
    //自定义指令
    const custInst = (datas: any) => {
      console.log(datas, 2);
    };
    const custColor = ref("red");
    // const zifu = (e: any) => {
    //   console.log("子元素点击浮云苏", e);
    // };
    return {
      num,
      btnFun,
      handFun,
      changsText,
      ...toRefs(zhang), //reactive的数据是响应式的，但是用解构运算符的就不是响应式的，必须用toRefs()转化
      custInst,
      custColor,
      // zifu,
    };
  },
});
</script>
<style lang="less" scoped vars='{custColor}'>
.mp {
  color: var(--custColor);
}
</style>
