<template>
    <h4>请选择需要检测的文本文件</h4>
    <el-upload
             action="#"
            :file-list="fileList"
            :on-change="handleChange"
            :headers="headers"
            :auto-upload="false"
    >
        <el-button size="default" type="primary">上传</el-button>
    </el-upload>
    <Horizon></Horizon>
    <div class="button">
                <span @click="show(1)"
                :class="index===1? 'active':''">按原文件导出</span>
                <span @click="show(2)"
                :class="index===2? 'active':''">按指定id导出</span>
            </div>
            
            <div class="tab_content">
                <keep-alive>
                    <div v-show="isShow">
                        <component :is="comp" >
                        </component>
                    </div>
                </keep-alive>
            </div>
    <Horizon></Horizon>
    <br>
    <br>
    <el-form :inline=true>
    <el-button size="default" type="success" @click="upload">开始分析</el-button>
    <el-button type="success">
        <a class = "download" href="/api/download.json">查看结果</a>
    </el-button>
    </el-form>
    <br><br>
    <div class = "options">
        <HighLevelOptions></HighLevelOptions>
    </div>
</template>
<script>
   import IDColumn from '@/components/ExportID'
    import Horizon from '@/components/Horizon'
    import OriginFile from '@/components/ExportOriginFile'
    import HighLevelOptions from '@/components/HighLevelOptions.vue';
    import axios from 'axios';
    export default{
        name : "ColAnalyze",
        components:{
            IDColumn,
            Horizon,
            OriginFile,
            HighLevelOptions
        },
        data(){
            return{
                fileList:[],
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                index : 1,
                comp:"OriginFile",
                isShow :true
            }
        },
        methods:{
            show(value){
                if(this.index === value){
                    this.index = 0
                    this.isShow = !this.isShow
                }else{
                    this.index = value
                    this.isShow = true
                }
                if(value === 1) {
                    this.comp = 'OriginFile'
                  
                }
                if(value === 2) {
                    this.comp = 'IDColumn'
                }
            },
            handleChange(file,fileList){
                this.fileList=fileList;
            },
            upload() {
                const fd = new FormData()
                const column = sessionStorage.getItem("column")
                const idColumn = sessionStorage.getItem("idColumn")
                console.log(column)
                console.log(idColumn)
                fd.append("column",column)
                fd.append("idColumn",idColumn)
                this.fileList.forEach(
                    (val,index)=>{
                        fd.append("filename",val.raw);
                    }
                );
                
                axios.post("/api/analyzeWithCol",fd).then(responce=>{
                    console.log(responce)
                });
                this.$message({
                    message:"上传成功！",
                    duration:1000
                })
                
            },
        }
    }
    
</script>
<style scoped lang="scss">
.button {
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 100px;
      border: 1px solid #e6e6e6;
      cursor: pointer;
    }
    .active {
      color: #ffffff;
      background: #42b983;
    }
  }
  .download{
            color: white;
		}
    .options{
        position: fixed;
        right: 32%;
    }
</style>