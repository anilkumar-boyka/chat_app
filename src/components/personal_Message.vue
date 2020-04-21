<template>
  <div class="hello">
    <h2><b-badge>Chat Room</b-badge></h2>
      <div class="chat">
        <b-row>
          <b-col>
            <span class="conections">
              <!-- <i class="fas fa-circle"></i> -->
              <span class="active_users"> Welcome {{name}}....</span>
             </span> 
          </b-col>
          <!-- hello -->
          <!-- <b-col>
              <span class="online_userName" v-on:click=send_personal_msg()>Click here to Send Personal Message</span>
          </b-col> -->
          <b-col>
            <span class="online_userName" v-if="show_name_list"> Send Personal Message to :</span>
            <span class="dropbtn"><i v-if="show_name_list" class="fas fa-caret-down fa-2x	"></i>
              <span class="dropdown-content">
                <ul>
                  <li v-for="online_user in online_users" v-if="online_user.name!=name">
                    <b-button  v-on:click="send_personal_msg($event,online_user.socket_id)" class="nameList">
                      <span :class={onlineUser:isTrue}>{{online_user.name}}</span>
                      <!-- <span>{{online_user.socket_id}}</span> -->
                    </b-button>
                  </li>
                </ul>
              </span>
              </span>
          </b-col>
        </b-row><hr>
       <b-container> 
          <span class=typing_info>{{user_typing}}</span>
          <div class="message_info" v-if="">
            <!-- <span class="name">Anil</span>
            <span class="message"> hello</span><br><br>
            <span class="name"> abc</span>
            <span class="message"> hello world</span>{{recieved_messages}} -->
            <ul>
              <li v-for="personal_msg_recieved in personal_msgs_recieved">
                <span class="name">{{personal_msg_recieved.names}} </span>
                <span class="message"> {{personal_msg_recieved.msgs}}</span>
                <span class="time">{{personal_msg_recieved.time}}</span>
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
          <b-button v-if="show_proceed_button" v-on:click="chat_room()"  block variant="primary">Proceed</b-button>
        </b-container>
      </div>
      <!-- <div class="footer">send o</div> -->
      <!-- hello -->

    
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
      current_socketid : '',
      show_name_list : 0,
      current_personal_msg_user : '',
      isTrue : 0,
      clicked_Socketid : '',
      personal_msgs_recieved :[]
    }
  },
  mounted(){
    console.log("hey mount hello");
    this.current_socketid = this.$socket.id;
  },
  sockets : {
    connect : function () {
      console.log("both client and server connected to each other");
      console.log(this.$socket.id);
      // this.current_socketid = this.$socket.id;
    },
    socket_id : function (data) {
      // console.log("socket id is...")
      // console.log(data)
      
    },
    recieved_personal_msg : function (data){
      this.user_typing = '';
      // alert("hello rcvd msg")
      console.log('rcvd data is...')
      console.log(data)
      // this.personal_msgs_recieved.msg=data.message
      this.personal_msgs_recieved.push({names : data.name,msgs :data.message,time : data.time})
      // this.personal_msgs_recieved.names=data.name
      // this.personal_msgs_recieved.time=data.time
      console.log(data.message)
      // console.log(data.name.name)
      this.recieved_messages.push(data);
      
    },
    client_info: function (data){
      // console.log('client info');
      // console.log(data);
      this.active_clients = data;
    },
    chat_name : function (data) {
      console.log("rcvd name and socketid is")
      console.log(data);
      this.recieved_name = data;
      this.online_users.push(data)
      // console.log(this.online_users )
      // console.log(this.recieved_name)
    },
    typing : function (data) {
      // console.log('typing name')
      // console.log(data)
      this.typing_name = data;
      this.user_typing = this.typing_name+' is typing....'
      console.log(this.user_typing)
    },
    // online_userName : function (data) {
    //   console.log("online users are..")
    //   console.log(data)
    // },
    name_selected_for_personal_msg : function (data) {
      alert("hello")
      console.log("hell personal msg")
      console.log(data.username)
    }
  },
  methods: {
        send: function (data) {
          // this.personal_msgs_recieved.msgs.push(this.text_message);
          // this.personal_msgs_recieved.names.push(this.name)
            // $socket is socket.io-client instance
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            this.current_time = dateTime;
          // this.personal_msgs_recieved.time.push(this.current_time)
          this.personal_msgs_recieved.push({names : this.name,msgs :this.text_message,time :this.current_time})
            if(this.text_message)
            {     
                this.$socket.emit('personal_message', {
                  message : this.text_message,
                  name : this.name,
                  time : this.current_time,
                  personal_msg_reciever : this.current_personal_msg_user,
                  Socketid  : this.clicked_Socketid
                  
                })
            }
            else{
              alert("Message cannot be an empty string")
            }
            this.text_message = '';
            
            // console.log("who is tping")
            // console.log("me"+this.user_typing)
        },
        chat_room : function () {
          if(this.name){  
              //  this.online_users.push(this.name)       
              this.$socket.emit('chat_name', {
                  name : this.name,
                  socket_id : this.current_socketid
                  //  online_users : this.online_users 
                  })
              // this.$socket.emit('online_userName', {
              //     online_users : this.online_users
              //     })
                this.show_proceed_button =!this.show_proceed_button;
                this.show_input_msg_field =!this.show_input_msg_field;
                this.show_input_name_field = !this.show_input_name_field;
                this.show_messages = !this.show_messages;   
                this.show_name_list = !this.show_name_list;
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
        send_personal_msg : function (event,Socketid) {
          this.clicked_Socketid = Socketid;
          this.isTrue = 1;
          console.log(event)
          console.log("socket id is"+this.clicked_Socketid)

          // console.log(event.srcElement.innerText)
          // var skt = JSON.parse(event.srcElement.innerText)
          // console.log(skt.socket_id)
          this.current_personal_msg_user = event.srcElement.innerText;
        //   alert(this.current_socketid)
        //   this.$socket.emit('join',this.current_socketid);
          
          this.$socket.emit('join', {
            username:Socketid ,
          })
        },
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
  .onlineUser{
    background-color: chartreuse;
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
