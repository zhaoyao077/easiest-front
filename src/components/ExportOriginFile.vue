<template>
    <p>此方法将对输入文件的每行按制表符"\t"划分为列
        <br>对制定列的单词情感进行分析
        <br>并将情感分析结果以binary的形式附在每行末尾</p>
        <div style="text-align: -webkit-center;">
        <el-col :span="10">
        <el-input class="content" type="textarea" autosize v-model="column" placeholder="请输入指定的列号" @change="changeColumn"></el-input>
        </el-col></div>
</template>
<script>


export default{
    name:"OriginFile",
    data(){
        return {
            column:""
            
        }
    },
    methods:{
        changeColumn:function(val){
            this.column= val
            sessionStorage.setItem("column",this.column)
            sessionStorage.setItem("idColumn","")
        }
    }
}
</script>