<template>
    <el-button type="default" style="margin-left: 16px" @click="drawer = true">
      <h5>高级设置</h5>
    </el-button>
  
    <el-drawer v-model="drawer" size="50%" direction="ltr">
      <template #header>
        <h4>高级设置</h4>
      </template>
      <template #default>
        <div>
            <el-checkbox v-model="checked1" label="是否禁止增强词汇增强情绪(比如very)"></el-checkbox>
            <br>
            <el-checkbox v-model="checked2" label="是否禁止否定词反转情绪(比如not)"></el-checkbox>
            <br>
            <el-checkbox v-model="checked3" label="是否禁止否定词否定积极词汇来反转情绪(比如not)"></el-checkbox>
            <br>
            <el-checkbox v-model="checked4" label="是否禁止否定词修饰否定词来中和情绪(比如not)"></el-checkbox>
            <br>
            <el-checkbox v-model="checked5" label="是否禁止否定词与出现在情绪词后"></el-checkbox>
            <br>
            <el-checkbox v-model="checked6" label="是否禁止否定词语出现在情绪词前"></el-checkbox>
            <br>
            <el-checkbox v-model="checked7" label="是否忽略习语"></el-checkbox>
            <br>
            <el-checkbox v-model="checked8" label="是否允许疑问句减弱消极情绪"></el-checkbox>
            <br>
            <el-checkbox v-model="checked9" label="是否忽略表情符号"></el-checkbox>
            <br>
            <el-checkbox v-model="checked10" label="是否感叹号算作+2"></el-checkbox>
            <br><el-checkbox v-model="checked11" label="是否禁止多个积极词汇增强积极情绪"></el-checkbox>
            <br><el-checkbox v-model="checked12" label="是否禁止多个消极词汇增强消极情绪"></el-checkbox>
            <br><el-checkbox v-model="checked13" label="不忽略消极否定词后的增强词"></el-checkbox>
            <br><el-checkbox v-model="checked14" label="禁用词典纠正拼写"></el-checkbox>
            <br><el-checkbox v-model="checked15" label="禁止在一个词中出现额外的字母增强情绪(比如goood)"></el-checkbox>
            <br><el-checkbox v-model="checked16" label="不删除单词中额外的重复的字母"></el-checkbox>
            <br><el-checkbox v-model="checked17" label="允许大写的单词增强情绪"></el-checkbox>
            <br><el-checkbox v-model="checked18" label="是否总在'处分割单词(e.g.,t'aime->t'aime)"></el-checkbox>
            <br>
            <el-form :inline = true>
              <el-form-item label="否定词语改变情绪时要乘以的强度:">
            <el-input-number v-model="num" :min="0.2" :max="2" :step="0.1" @change="handleChange"></el-input-number>
            </el-form-item>
          </el-form>
            <el-form :inline = true>
              <el-form-item label="情绪词前用于否定的单词的最大数量:">
                <el-input v-model="input1"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="情绪词后用于否定的单词的最大数量:">
                <el-input v-model="input2"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="能改变句子情绪的最小标点符号以及感叹号的数量:">
                <el-input v-model="input3"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="如何界定中立强调(1表示积极,-1表示消极哦~)">
                <el-input v-model="input4"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="在单词中间不能重复出现的字母(中间不能有空格哦~)">
                <el-input v-model="input5"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="在单词结尾不能重复出现的字母(中间不能有空格哦~)">
                <el-input v-model="input6"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="引用讽刺所需的句子最小积极情绪得分(填整数哦~)">
                <el-input v-model="input8"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline =true>
              <el-form-item label="标点符号表示讽刺所需的句子最小积极情绪得分(填整数哦~)">
                <el-input v-model="input9"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="term表讽刺所需的句子最小积极情绪得分(填整数哦~)">
                <el-input v-model="input10"></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline = true>
              <el-form-item label="以上三种表示讽刺的最小积极情得分(填整数,该项的取值会覆盖上面三项哦~)">
                <el-input v-model="input11"></el-input>
              </el-form-item>
            </el-form>
              <el-form-item label="在判断句子的情绪是积极还是消极时消极情绪乘以的倍数">
            <el-input-number v-model="num1" :min="0.2" :max="2" :step="0.1" @change="handleChange"></el-input-number>
            </el-form-item>
        
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="success" @click="returnDefault">恢复默认值</el-button>
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </template>
  
  <script setup>
 import axios from 'axios';
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus'  
        const drawer = ref(false)
        const checked1 = ref(false)
        const checked2 = ref(false)
        const checked3 = ref(false)
        const checked4 = ref(false)
        const checked5 = ref(false)
        const checked6 = ref(false)
        const checked7 = ref(false)
        const checked8 = ref(false)
        const checked9 = ref(false)
        const checked10 = ref(false)
        const checked11 = ref(false)
        const checked12 = ref(false)
        const checked13 = ref(false)
        const checked14 = ref(false)
        const checked15 = ref(false)
        const checked16 = ref(false)
        const checked17 = ref(false)
        const checked18 = ref(false)
        const num = ref(0.5)
        const num1 = ref(1.5)
        const input1 = ref('0')
        const input2 = ref('0')
        const input3 = ref('0')
        const input4 = ref('1')
        const input5 = ref('ahijkquvxyz')
        const input6 = ref('achijkmnpqruvwxyz')
        const input8 = ref('10')
        const input9 = ref('10')
        const input10 = ref('10')
        const input11 = ref('10')
        const handleChange=(value)=>{
          console.log(value)
        }
        function cancelClick() {
          drawer.value = false
        }
        function returnDefault(){
        checked1.value=false
        checked2.value=false
        checked3.value=false
        checked4.value=false
        checked5.value=false
        checked6.value=false
        checked7.value=false
        checked8.value=false
        checked9.value=false
        checked10.value=false
        checked11.value=false
        checked12.value=false
        checked13.value=false
        checked14.value=false
        checked5.value=false
        checked6.value=false
        checked17.value=false
        checked18.value=false
        num.value=0.5
        num1.value=1.5
        input1.value='0'
        input2.value='0'
        input3.value='0'
        input4.value='1'
        input5.value='ahijkquvxyz'
        input6.value='achijkmnpqruvwxyz'
        input8.value='10'
        input9.value='10'
        input10.value='10'
        input11.value='10'
        }
        function confirmClick() {
          ElMessageBox.confirm(`你确定选择这些???`)
            .then(() => {
              drawer.value = false
              axios({
                    method:"post",
                    url:"/api/options",
                    headers:{
                        "Content-Type":"application/json; charset=utf-8"
                    },
                    data:{
                        "checked1":checked1.value,
                        "checked2":checked2.value,
                        "checked3":checked3.value,
                        "checked4":checked4.value,
                        "checked5":checked5.value,
                        "checked6":checked6.value,
                        "checked7":checked7.value,
                        "checked8":checked8.value,
                        "checked9":checked9.value,
                        "checked10":checked10.value,
                        "checked11":checked11.value,
                        "checked12":checked12.value,
                        "checked13":checked13.value,
                        "checked14":checked14.value,
                        "checked15":checked15.value,
                        "checked16":checked16.value,
                        "checked17":checked17.value,
                        "checked18":checked18.value,
                        "num":num.value,
                        "num1":num1.value,
                        "input1":input1.value,
                        "input2":input2.value,
                        "input3":input3.value,
                        "input4":input4.value,
                        "input5":input5.value,
                        "input6":input6.value,
                        "input8":input8.value,
                        "input9":input9.value,
                        "input10":input10.value,
                        "input11":input11.value
                    }
                }).then((response)=>{
                    console.log(response);
                })
            })
            .catch(() => {
              // catch error
            })
            
        }
            
    
  </script>
  <style>


</style>