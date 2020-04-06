<template>
  <div class="hello">
    
    
      <h2><b-badge>Chat Room</b-badge></h2>
      <div class="chat">
       <i class="fas fa-circle"></i><span class="active_users"> Number of Active Connections : {{active_clients}}</span> 
        <hr>
        <b-container> 
          <div class="message_info" v-if="">
            <!-- <span class="name">Anil</span>
            <span class="message"> hello</span><br><br>
            <span class="name"> abc</span>
            <span class="message"> hello world</span>{{recieved_messages}} -->
            <ul>
              <li v-for="recieved_message in recieved_messages">
                <span class="name">{{recieved_message.name}} </span>
                <span class="message"> {{recieved_message.message}}</span>
              </li>
            </ul>
          </div>
          <b-form>
            <b-form-input
                v-if="show_input_name_field"
                v-model ="name"
                id="input-1"
                type="text"
                required
                placeholder="Enter your name">
              </b-form-input>
              
            <b-form-input
            v-if="show_input_msg_field"
            id="input-1"
            v-model ="text_message"
            type="text"
            required
            placeholder="Enter your message"
          >
          </b-form-input>
          </b-form>
          <b-button v-if="show_input_msg_field" v-on:click="send()"  block variant="primary">send</b-button>
          <b-button v-if="show_proceed_button" v-on:click="chat_room()"  block variant="primary">Enter Chat Room</b-button>
        </b-container>
      </div>
      <!-- <div class="footer">send o</div> -->

    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'Lets Chat',
      text_message:'',
      connections: 0,
      name : '',
      recieved_messages : [],
      recieved_name : '',
      active_clients : '',
      show_input_msg_field : 0,
      show_proceed_button : 1,
      show_input_name_field : 1,
      show_messages : 0
    }
  },
  mounted(){
    console.log("hey mount hello");
  },
  sockets : {
    connect : function () {
      console.log("both client and server connected to each other");
    },
    socket_id : function (data) {
      console.log("socket id is...")
      console.log(data)
    },
    chat_message : function (data){
      console.log('data is...')
      console.log(data)
      // console.log(data.message)
      // console.log(data.name.name)
      this.recieved_messages.push(data);
      
    },
    client_info: function (data){
      // console.log('client info');
      // console.log(data);
      this.active_clients = data;
    },
    chat_name : function (data) {
      // console.log("rcvd name is")
      // console.log(data);
      this.recieved_name = data;
      // console.log(this.recieved_name)
    }
  },
  methods: {
        send: function (data) {
            // $socket is socket.io-client instance
            this.$socket.emit('chat_message', {
              message : this.text_message,
              name : this.name
              
            })
            this.text_message = '';
        },
        chat_room : function () {
          this.$socket.emit('chat_name', {
              name : this.name
              })
          this.show_proceed_button =!this.show_proceed_button;
          this.show_input_msg_field =!this.show_input_msg_field;
          this.show_input_name_field = !this.show_input_name_field;
          this.show_messages = !this.show_messages;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.message_info{
  text-align: left;
}
.fa-circle{
  color :#a0c334;
}
.message{
  background-color: #007bff;
  color : white;
  padding : 4px;
  border-radius:15px 50px 50px 15px;
  /* display: block; */
}
.active_users{
  font-family: 'Gotu', sans-serif;
 font-size: 20px;
 font-weight: bold;
}
.name{
  font-family: 'Anton';
  font-size: 20px;
  opacity: 0.9;
}
li{
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
 }
/* .chat{
  min-height: 300px;
  border : 2px solid grey;
} */
/* .footer {
   position: absolute;
    bottom: 0; 
   top : 90%;
    width: 100%; 
    text-align: center;
 
} */
/* .send_btn{
  position: absolute;
  top : 500px;
} */
</style>
