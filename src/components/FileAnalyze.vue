<template>
    <div class="anlysis">
        <el-upload
             action="#"
            :file-list="fileList"
            :on-change="handleChange"
            :headers="headers"
            :auto-upload="false"
        >
            <el-button size="default" type="primary">上传</el-button>
        </el-upload>
        <el-form :inline=true>
        <el-button size="default" type="success" @click="upload">开始分析</el-button>
        <el-button type="success">
        <a class = "download" href="/api/download.json">查看结果</a></el-button>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios';

    export default{
        name:"File",
        data(){
            return {
                fileList:[],
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
        },
        methods:{
            handleChange(file,fileList){
                this.fileList=fileList;
                
            },
            upload() {
                const fd = new FormData()
                this.fileList.forEach(
                    (val,index)=>{
                        fd.append("filename",val.raw);
                    }
                );
                axios.post("/api/upload",fd).then(responce=>{
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
<style>
    .download{
			
            color: white;
          
		}
</style>