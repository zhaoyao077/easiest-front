<template>
   <div class = "container">
  
            <label for="text"><h1>Choose your mode !</h1></label>
            <el-radio-group v-model="mode" @change="agreeChange">
                <el-radio-button label="binary" @click="show2(1)"></el-radio-button>
                <el-radio-button label="trinary" @click="show2(2)"></el-radio-button>
                <el-radio-button label="scale" @click="show2(3)"></el-radio-button>
            </el-radio-group>
                <div class="desprition">
                    <p v-show="showDescription1">该模式为二元分类方式,报告正-负的分类这方面的结果会像3-1.
                        <br>这就是:(+ve分类)(-ve分类)(二元分类)</p>
                </div>
                <div class="desprition">
                    <p v-show="showDescription2">该模式为三元分类模式,报告正-负-中性的分类这方面的结果会像3-1-1.
                        <br>这就是:(+ve分类)(-ve分类)(三元分类)</p>
                </div>
                <div class="desprition">
                    <p v-show="showDescription3">该模式为范围分类,报告单独-4到4之间的分类这方面的结果会像3 -4 -1.
                    <br>这就是:(+ve分类)(-ve分类)(范围分类)</p>
                </div>
           
            <Horizon></Horizon>
            <br>
            <div class="button">
                <span  @click="show1(1)"
                :class="index1===1? 'active':''">关键词模式</span>
                <span  @click="show1(2)"
                :class="index1===2? 'active':''">不使用关键词</span>
            </div>
            <div class="tab_content">
                <keep-alive>
                    <div v-show="isShow1">
                        <component :is="comp1">
                        </component>
                    </div>
                </keep-alive>
            </div>
            
            <div class="button">
                <span @click="show(1)"
                :class="index===1? 'active':''">输入文本分析</span>
                <span @click="show(2)"
                :class="index===2? 'active':''">上传文件分析</span>
            </div>
            
            <div class="tab_content">
                <keep-alive>
                    <div v-show="isShow">
                        <component :is="comp">
                        </component>
                    </div>
                </keep-alive>
            </div>
            <br>
        <div class="options">
        <HighLevelOptions></HighLevelOptions>
            </div>
   </div> 
</template>
<script>
import HighLevelOptions from "@/components/HighLevelOptions.vue"
import Horizon from "@/components/Horizon.vue"
import File from "@/components/FileAnalyze.vue"
import String from "@/components/StringAnalyze.vue"
import KeyWordMode from "@/components/KeyWordMode.vue"
    export default{
        name : "ModeAnalyze",
        components :{
            Horizon,
            KeyWordMode,
            File,
            String,
            HighLevelOptions
        },
        data(){
            return {
                mode : '',
                keyWordMode : false,
                textToAnalyze : '',
                index:1,
                index1:2,
                // fileOrString:'String',
                comp:'String',
                comp1:'NotKeyWordMode',
                isShow:true,
                isShow1:true,
                showDescription1:true,
                showDescription2:false,
                showDescription3:false,
                
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
                    this.comp = 'String'
                  
                }
                if(value === 2) {
                    this.comp = 'File'
                }
            },
            show1(value){
                if(this.index1 === value){
                    this.index1 = 0
                    this.isShow1 = !this.isShow1
                }else{
                    this.index1 = value
                    this.isShow1 = true
                }
                if(value === 1) {
                    this.comp1 = 'KeyWordMode'
                    this.keyWordMode = true
                }  
                if(value === 2) {
                    this.comp1 = 'NotKeyWordMode'
                    this.keyWordMode = false
                }
                sessionStorage.setItem("keyWordMode",this.keyWordMode)
            },
            show2(val){
                if(val=== 1){
                    this.showDescription1=true
                    this.showDescription2=false
                    this.showDescription3=false
                }
                if(val===2){
                    this.showDescription1=false
                    this.showDescription2=true
                    this.showDescription3=false
                }
                if(val===3){
                    this.showDescription1=false
                    this.showDescription2=false
                    this.showDescription3=true
                }
            },
            
            agreeChange:function(val){
                let that= this;
                that.mode = val;
                sessionStorage.setItem("outputMode",val)
            },
        }
    }
</script>
<style scoped lang="scss">
    label {
        display: block;
        font-weight: bold;
        margin-bottom: 10px;
    }

    
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
    } }
    
    .options{

        position: fixed;
        right: 32%;
    }
 
</style>