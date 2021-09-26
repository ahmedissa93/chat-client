<template>
    <div class="vue-tempalte inner-block">
        <form>
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg" v-model="fullname"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password" />
            </div>

            <button class="btn btn-dark btn-lg btn-block login-btn mt-3" @click.prevent="register">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered
                <router-link :to="{name: 'Login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    import APIServices from "../../services/APIServices";
    export default {
        name: "Register",
        data(){
            return{
                fullname: "",
                email: "",
                password: "",
            }
        },methods:{
            async register() {
                let data = {name:this.fullname,email:this.email,password: this.password}
                await APIServices.register(data).then((response) => {
                    console.log(response)
                    if (response.data) {
                        window.localStorage.setItem('authenticated', true);
                        localStorage.setItem("token", response.data.accessToken);
                        localStorage.setItem("token_type", response.data.tokenType);
                        this.$showNotification('success','Login was successful!');
                        this.$router.push('/login');
                    }
                }).catch((error)=>{
                    console.log(error)
                    this.$showNotification('error','Authentication Failed');
                });
            }
        }
    }
</script>

<style scoped>

</style>