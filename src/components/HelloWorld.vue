<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello socket',
    }
  },
  mounted(){
    console.log("hey mount")
  },
  sockets: {
    connect : function() {
      console.log('socket yooo');
    },
    connect_error : function(error) {
      console.log("eror is"+error);
    },
    error : function(error)
    {
      console.log("actual err is"+error)
    } 
  } 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
