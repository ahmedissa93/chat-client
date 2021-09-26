<template>
    <div>
        <div class="container content">
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="card">
                        <div class="card-header">Chat</div>
                        <div class="card-body height3">
                            <ul class="chat-list">
                                <li :class="message.user_id == user_id ? 'in':'out'" v-for="(message , index) in messages" :key="index">
                                    <div class="chat-img">
                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png">
                                    </div>
                                    <div class="chat-body">
                                        <div class="chat-message">
                                            <h5>{{message.name}}</h5>
                                            <p>{{message.text}}</p>
                                        </div>
                                    </div>
                                </li>
<!--                                <li class="out">-->
<!--                                    <div class="chat-img">-->
<!--                                        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png">-->
<!--                                    </div>-->
<!--                                    <div class="chat-body">-->
<!--                                        <div class="chat-message">-->
<!--                                            <h5>Serena</h5>-->
<!--                                            <p>Next level veard</p>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </li> -->
                                <b-form-group id="input-group-2">
                                    <b-form-input
                                            id="input-2"
                                            v-model="message"
                                            placeholder="Enter Message"
                                            required
                                            @keyup.enter="sendMessage()"
                                    ></b-form-input>
                                </b-form-group>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import io from "socket.io-client";
    const socket = io.connect('http://192.168.1.103:3000', {reconnect: true});

    export default {
        name: "ViewChats",
        data(){
            return {
                message:"",
                messages:"",
                user_id:''
            }
        },methods:{
            sendMessage(){
                let room_id = this.$route.params.id;
                socket.emit('sendMessage', this.message, room_id ,() => this.message = "");
            },
            historyMessages(){
                let room_id = this.$route.params.id;
                socket.emit('get-messages-history', room_id)
                socket.on('output-messages', messages => {
                    this.messages = messages;
                })
            },
            getMessage(){
                socket.on('message', message => {
                    console.log(message)
                    this.messages = [...this.messages ,message];
                })
            }
        },
        mounted(){
            let room_id = this.$route.params.id;
            let user = JSON.parse(localStorage.getItem('user'));
            this.user_id = user._id;
            socket.emit('join', { name: user.name, room_id , user_id: user._id });
            socket.on('output-messages', messages => {
                this.messages = messages;
            });
            this.historyMessages();
            this.getMessage();
        }
    }
</script>

<style scoped>
    body{
        background:#eee;
    }
    .chat-list {
        padding: 0;
        font-size: .8rem;
    }

    .chat-list li {
        margin-bottom: 10px;
        overflow: auto;
        color: #ffffff;
    }

    .chat-list .chat-img {
        float: left;
        width: 48px;
    }

    .chat-list .chat-img img {
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        width: 100%;
    }

    .chat-list .chat-message {
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background: #5a99ee;
        display: inline-block;
        padding: 10px 20px;
        position: relative;
    }

    .chat-list .chat-message:before {
        content: "";
        position: absolute;
        top: 15px;
        width: 0;
        height: 0;
    }

    .chat-list .chat-message h5 {
        margin: 0 0 5px 0;
        font-weight: 600;
        line-height: 100%;
        font-size: .9rem;
    }

    .chat-list .chat-message p {
        line-height: 18px;
        margin: 0;
        padding: 0;
    }

    .chat-list .chat-body {
        margin-left: 20px;
        float: left;
        width: 70%;
    }

    .chat-list .in .chat-message:before {
        left: -12px;
        border-bottom: 20px solid transparent;
        border-right: 20px solid #5a99ee;
    }

    .chat-list .out .chat-img {
        float: right;
    }

    .chat-list .out .chat-body {
        float: right;
        margin-right: 20px;
        text-align: right;
    }

    .chat-list .out .chat-message {
        background: #fc6d4c;
    }

    .chat-list .out .chat-message:before {
        right: -12px;
        border-bottom: 20px solid transparent;
        border-left: 20px solid #fc6d4c;
    }

    .card .card-header:first-child {
        -webkit-border-radius: 0.3rem 0.3rem 0 0;
        -moz-border-radius: 0.3rem 0.3rem 0 0;
        border-radius: 0.3rem 0.3rem 0 0;
    }
    .card .card-header {
        background: #17202b;
        border: 0;
        font-size: 1rem;
        padding: .65rem 1rem;
        position: relative;
        font-weight: 600;
        color: #ffffff;
    }

    .content{
        margin-top:40px;
    }
</style>