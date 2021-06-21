<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <Test
      user="Test"
      @input="dataLoad"
    />
    <p>[{{ message }}]</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ ->/src/frontend
import { TestService } from "@/biz/remote/TestService";
import Test from "../components/Test.vue";
@Options({
  components: { HelloWorld, Test },
})
export default class Home extends Vue {
  message = "";
  async created() {
    const service = new TestService();
    console.log(await service.getByNote("test"));
  }
  dataLoad(data: any) {
    this.message = data;
  }
}
</script>
