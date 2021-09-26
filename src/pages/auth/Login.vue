<template>
    <div class="vue-tempalte inner-block ">
        <form>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="email"/>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="password"/>
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block mt-3 login-btn" @click.prevent="login">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            <span v-if="error">{{error}}</span>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>

        </form>
    </div>
</template>

<script>
    import APIServices from "../../services/APIServices";
    export default {
        name: "Login" ,
        data() {
            return {
                email: '',
                password: '',
                error:''
            }
        },
        methods: {
            async login() {
                let data = {email:this.email,password: this.password}
                console.log(JSON.stringify(data))
                await APIServices.login(data).then((response) => {
                    console.log(response.data.user)
                    if (response.data) {
                        window.localStorage.setItem('authenticated', true);
                        window.localStorage.setItem('user', JSON.stringify(response.data.user));
                        // localStorage.setItem("token", response.data.accessToken);
                        // localStorage.setItem("token_type", response.data.tokenType);
                        this.$showNotification('success','Login was successful!');
                        this.$router.push('/');
                    }
                }).catch((error)=>{
                    this.error = error;
                    console.log(error)
                    this.$showNotification('error','Authentication Failed');
                });
            }
        }
    }
</script>

<style scoped>

</style>