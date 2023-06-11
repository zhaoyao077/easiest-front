<template>

  <el-container id="background" >
    <el-header><Navbar></Navbar></el-header> 
     
        <!-- <el-aside width="300px" id="background"></el-aside> -->
   
      <el-main ><router-view/></el-main>
      <el-footer id="background1"></el-footer>
    

  </el-container>

</template>
<script>
import Navbar from './components/Navbar.vue'
export default{
  components:{
    Navbar
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  
}
body{
  margin:0;
  padding:0;
  border:0
}
.el-main{
  position: absolute;
  right: 100px;
  top:80px
  
}

#background{
  background:url("../public/img/9067c8d77270cb0203330d665cb12eca.jpg") no-repeat;
  width:100%;
  height:100%;
  position: fixed;
  background-size: 60% 100%;
  
  opacity: 0.8;
}

.el-footer{
position: absolute;
top:600px;
left:1000px;
}

#background1{
  background: url(
    "../public/img/bbbbaeb0_E641283_5463e271.png"
  ) no-repeat;
  width: 60%;
  height: 80%;
  opacity: 0.2;
  position: fixed;
  background-size: 100%,100%;
  pointer-events: none;
}

</style>
