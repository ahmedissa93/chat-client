<template>
  <div class="vue-tempalte">
    <div id="app" class="App">
      <div class="vertical-center">
<!--        <div class="inner-block">-->
          <router-view />
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
    import APIServices from "./services/APIServices";

    export default {
    name: "App" ,
      methods: {
          async verifyuser(){
              await APIServices.verifyuser().then((response) => {
                  console.log(response)
                  if (response.data) {
                      // localStorage.setItem("token", response.data.accessToken);
                      // localStorage.setItem("token_type", response.data.tokenType);
                      // this.$showNotification('success','Login was successful!');
                      // this.$router.push('/');
                  }
              }).catch((error)=>{
                  console.log(error)
                  // this.$showNotification('error','Authentication Failed');
              });
          }
      },
      mounted() {
            // this.verifyuser();
      }
  };
</script>
