<template>
    <div class="inner-block">
        <b-container class="bv-example-row">
            <b-row>
                <b-col md="12">

                    <b-form>

                        <b-form-group id="input-group-2" label="Your Room Name :" label-for="input-2">
                            <b-form-input
                                    id="input-2"
                                    v-model="form.room"
                                    placeholder="Enter name"
                                    required
                            ></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary" @click.prevent="createRoom()">create Room </b-button>
                    </b-form>

                </b-col>
            </b-row>

        </b-container>
        <b-container class="bv-example-row mt-5">
            <b-row>
                <b-col md="12">
                    <ul class="list-group" v-for="(room ,index) in rooms" :key="index">
                        <router-link :to="'/chat/view/' + room._id" class="list-group-item">{{room.name}}</router-link>
                    </ul>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
    import io from "socket.io-client";
    const socket = io.connect('http://192.168.1.103:3000', {reconnect: true});

    export default {
        name: "Index",
        data() {
            return {
                rooms: [],
                newRooms: [],
                form: {
                    email: '',
                    room: '',
                    food: null,
                    checked: []
                },
                foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                show: true
            }
        },
        methods: {
            createRoom(){
                socket.emit('create-room', this.form.room);
                console.log(this.form.room);
                this.form.room = "";
                this.getNewRooms();
            },
            getNewRooms(){
                socket.on('room-created', room => {
                    console.log(room);
                    this.rooms = [...this.rooms, room];
                    console.log(this.newRooms);
                });
            },
            ListRooms(){
                socket.on('output-rooms', rooms => {
                    this.rooms = rooms;
                })
            }
        },mounted() {
            this.ListRooms();
        }
    }
</script>

<style scoped>

</style>