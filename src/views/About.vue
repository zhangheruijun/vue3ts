<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <router-view class="kaidong" style="background: red"></router-view> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from "vue";
// import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "about",
  setup() {
    const { ctx }: any = getCurrentInstance(); //获取路由
    console.log(ctx.$router, ctx);
  },
});
</script>
