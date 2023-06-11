<template>
    <el-select v-model="user" placeholder="选择用户" @change ="SelectChanged">
        <el-option v-for="item in users" :key = "item" :label = "item" :value = "item"></el-option>
    </el-select>
    <div class = "showFirst" v-show="ifDisplay1">
        <div class = "picture1">
        <el-image style="wdith:500px; height:500px" :src="url1" ></el-image>
        </div>
        <div class = "showData">
        <el-table  :data="details1"  highlight-current-row border style="width: 100%" height="calc(100%-10rem)" :header-cell-style="{background:'#eef1f6',color:'#606266'}" class="table-fixed-lineBug">
            <el-table-column fixed prop ="persion" label="Persion" width="130" />
            <el-table-column prop ="positive" label="Positive Count" width="130" />
            <el-table-column prop ="negative" label="Negative Count" width="130" />
            <el-table-column prop ="neutral" label="Neutral Count" width="130" />
            <el-table-column prop ="sum" label="Sum" width="130" />
        </el-table>
    </div>
    </div>
    <div class = "showSecond" v-show="ifDisplay2">
        <div class = picture2>
        <el-image  style="wdith:380px; height:380px" :src="url2"></el-image>
        </div>
        <div class = picture3>
        <el-image  style="wdith:380px; height:380px" :src="url3"></el-image>
        </div>
   
        <div class = "showData">
        <el-table  :data="details2"  highlight-current-row border style="width: 100%" height="calc(100%-10rem)" :header-cell-style="{background:'#eef1f6',color:'#606266'}" class="table-fixed-lineBug">
            <el-table-column fixed prop ="persion" label="Persion" width="130" />
            <el-table-column prop ="positive" label="Positive Count" width="130" />
            <el-table-column prop ="negative" label="Negative Count" width="130" />
            <el-table-column prop ="neutral" label="Neutral Count" width="130" />
            <el-table-column prop ="sum" label="Sum" width="130" />
        </el-table>
    </div> </div>
    
</template>
<script>
export default{
    name :'',
    components:{},
    props:{},
    data(){
        return {
            users:['6477701(评论数排名第一)','1475305(评论数排名第二)'],
            user:"6477701(评论数排名第一)",
            ifDisplay1:true,
            ifDisplay2:false,
            details1:[],
            details2:[],
            url1:"../img/picture1.png",
            url2:"../img/picture2.png",
            url3:"../img/picture3.png"
        }
    },
    created(){
        fetch('../data/6477701.json')
      .then(response => response.json())
      .then(data => {
            this.details1 =  data
      });
      fetch('../data/1475305.json')
      .then(response => response.json())
      .then(data => {
            this.details2 =  data
      });
    },
    methods:{
        SelectChanged(value){
            if(value == "6477701(评论数排名第一)"){
                this.ifDisplay1 = true;
                this.ifDisplay2 = false;
            }
            if(value == "1475305(评论数排名第二)"){
                this.ifDisplay1 = false;
                this.ifDisplay2 = true;
            }
        }
    }
}

</script>
<style>
   .showData {
        position: fixed;
        opacity: 0.8;
        right: 0px;
    }
    .picture1{
        position:fixed;
        left : 0px;
        top: 120px;
        opacity: 0.75;
    }
    .picture2{
        position: fixed;
        left : 0px;
        top: 20px;
        opacity: 0.75;
        
    }
    .picture3{
        position: fixed;
        left : 0px;
        top: 380px;
        opacity: 0.75;
        
    }
  
</style>