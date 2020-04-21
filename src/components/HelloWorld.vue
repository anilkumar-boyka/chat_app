<template>
  <div class="hello">
    <h2><b-badge>Chat Room</b-badge></h2>
      <div class="chat">
        <b-row>
          <b-col>
            <span class="conections">
              <i class="fas fa-circle"></i>
              <span class="active_users"> Number of Active Connections : {{active_clients}}</span>
             </span> 
          </b-col>
          <b-col>
            <span class="online_userName" v-on:click="send_personal_msg()">Click here to Send Personal Message</span>
          </b-col>
          <!-- <b-col>
            <span class="online_userName">Click here to Send Personal Message to :</span>
            <span class="dropbtn"><i class="fas fa-caret-down fa-2x	"></i>
              <span class="dropdown-content">
                <ul>
                  <li v-for="online_user in online_users">
                    <b-button v-on:click="send_personal_msg($event)" class="nameList">
                      <span >{{online_user}}</span>
                    </b-button>
                  </li>
                </ul>
              </span>
              </span>
          </b-col> -->
        </b-row><hr>
       <b-container> 
          <span class=typing_info>{{user_typing}}</span>
          <div class="message_info" v-if="">
            <ul>
              <li v-for="recieved_message in recieved_messages">
                <span class="name">{{recieved_message.name}} </span>
                <span class="message"> {{recieved_message.message}}</span>
                <span class="time">{{recieved_message.time}}</span>
              </li>
            </ul>
          </div>
          <b-form>
            <b-form-input
                v-if="show_input_name_field"
                v-model ="name"
                v-on:keydown.enter="chat_room()"
                id="input-1"
                type="text"
                required
                placeholder="Enter your name">
              </b-form-input>
              
            <b-form-input
            v-if="show_input_msg_field"
            id="input-1"
            v-model ="text_message"
            v-on:keydown.enter="send()"
            v-on:keydown="key_press"
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
      show_messages : 0,
      current_time : '',
      typing_name : '',
      user_typing : '',
      online_users : [],
      current_socketid : ''
    }
  },
  mounted(){
    console.log("hey mount hello");
  },
  sockets : {
    connect : function () {
      console.log("both client and server connected to each other");
      console.log(this.$socket.id);
      this.current_socketid = this.$socket.id;
    },
    socket_id : function (data) {
      // console.log("socket id is...")
      // console.log(data)
      
    },
    chat_message : function (data){
      this.user_typing = '';
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
      console.log("rcvd name is")
      // console.log(data);
      this.recieved_name = data;
      this.online_users.push(data.name)
      console.log(this.online_users )
      // console.log(this.recieved_name)
    },
    typing : function (data) {
      console.log('typing name')
      console.log(data)
      this.typing_name = data;
      this.user_typing = this.typing_name+' is typing....'
      console.log(this.user_typing)
    },
    online_userName : function (data) {
      console.log("online users are..")
      console.log(data)
    },
    socketId : function (data) {
      console.log("hrll dm")
      console.log(data)
    }
  },
  methods: {
        send: function (data) {
            // $socket is socket.io-client instance
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            this.current_time = dateTime;
            if(this.text_message)
            {
                this.$socket.emit('chat_message', {
                  message : this.text_message,
                  name : this.name,
                  time : this.current_time,
                  
                })
            }
            else{
              alert("Message cannot be an empty string")
            }
            this.text_message = '';
            
            console.log("who is tping")
            console.log("me"+this.user_typing)
        },
        chat_room : function () {
          if(this.name){  
              //  this.online_users.push(this.name)       
              this.$socket.emit('chat_name', {
                  name : this.name,
                  //  online_users : this.online_users 
                  })
              // this.$socket.emit('online_userName', {
              //     online_users : this.online_users
              //     })
                this.show_proceed_button =!this.show_proceed_button;
                this.show_input_msg_field =!this.show_input_msg_field;
                this.show_input_name_field = !this.show_input_name_field;
                this.show_messages = !this.show_messages;   
          }
          else{
            alert("Name input cannot be an empty string")
          }
          
        },
        key_press : function (event) {
          // console.log(event)
          // console.log(this.name)
          this.$socket.emit('typing',this.name)
        },
        send_personal_msg : function (event) {
        //   console.log(event)
        //   console.log(event.srcElement.innerText)
        //   alert(this.current_socketid)
        //   this.$socket.emit('join',this.current_socketid);
          this.$router.push({name:'personal_Message'}); 
        //   this.$socket.emit('join', {
        //     email:'ak123.com',
        //   })
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
 .time {
   font-size: 12px;
   font-family: 'Noto Sans', sans-serif;
   font-weight: bold;
   opacity: 0.5;
 }
 .typing_info{
   font-style: italic;
   color : grey;
   font-family: 'Noto Sans', sans-serif;
   text-align: right;
   display:block;
   margin:0 20px 0 20px;
 }
 .active_users{
   margin-right: 100px;
 }
 .dropbtn {
  /* background-color: black; */
  color: white;
  padding: 4px;
  font-size: 16px;
  border: none;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  max-width: 190px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: none;
}
.dropdown-content a {
  background-color: #ddd;
  }

 .dropbtn:hover .dropdown-content  {
   display: inline;
   /* background-color: blue; */
   }
   .nameList{
     margin-right: 3px;
     text-align: center;
     /* display: inline-block; */
   }
  .fa-caret-down {
    color : black;
    /* margin-top : 10px; */
  }
  .online_userName {
    /* margin-bottom: 13px; */
    font-family: 'Gotu', sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
 /* .dropbtn:hover {
   background-color: #3e8e41;
   } */
/* .chat{
  min-height: 300px;
  border : 2px solid grey;
} 
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
