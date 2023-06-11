<template>
    <p>此方法同样对输入文件的每行按制表符"\t"划分为列
        <br>对指定列的单词的情感进行分析
        <br>但会以指定id列号的单词作为标签
        <br>将情感分析结果附在每行的标签的后面
    </p>
    <div class="analyzeID" style="text-align: -webkit-center;">
        <el-col :span="8">
        <el-input class="content" type="textarea" autosize v-model="column" placeholder="请输入指定的列号" @change="changeColumn"></el-input>
        <br>
        <br>
        <el-input class="content" type="textarea" autosize v-model="idColumn" placeholder="请输入ID的列号" @change="changeIDColumn"></el-input>
      </el-col>
      </div>
</template>
<script>
export default{
    name: "IDColumn",
    data(){
        return {
            idColumn:"",
            column:""
        }
    },
    methods:{
        changeColumn:function(val){
            this.column = val
            sessionStorage.setItem("column",this.column)
        },
        changeIDColumn:function(val){
            this.idColumn = val
            sessionStorage.setItem("idColumn",this.idColumn)
        }
    }
}
</script>