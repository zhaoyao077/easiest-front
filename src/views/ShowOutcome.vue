<template>
    <div id = 'pieChart'>
        <div ref="pieChart"  style="width: 800px; height: 315px; background-color: #ffffff;"></div>
    </div>
    <div id="lineChart">
        <div ref="lineChart" style="width: 800px; height: 350px; background-color: #ffffff; padding: 20px; border-radius: 20px;"></div>
    </div>
    <br>
    <div class="showData">
    <el-form :inline="true">
      <el-form-item>
          <el-upload ref = "upload" action="/" :show-file-list="false" :on-change="importExcel" :auto-upload="false">
              <el-button class="d2-mt-10 d2-mb-10" slot="trigger" type="primary">
                  上传展示文件
              </el-button>
              (xlsx,xls,csv)
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-select v-model="version" placeholder="选择版本" @change="selectChanged">
            <el-option v-for = "item in versions" :key = "item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
    </el-form>
    <el-table :data="issueList" highlight-current-row border style="width: 100%" height="550" :header-cell-style="{background:'#eef1f6',color:'#606266'}" class="table-fixed-lineBug">
      <el-table-column fixed prop="content" label="Content" width="130"/>
      <el-table-column prop = user label="User" width="100"/>
      <el-table-column prop = "version" label="Version" width="120"/>
      <el-table-column prop = "positive" label="Positive" width="80"/>
        <el-table-column prop = "negative" label = "Negative" width="85"/>
        <el-table-column prop = "sentiment" label = "Sentiment" width="95"/>
      <el-table-column :formatter="dateFormat" prop="date" label="Date" width="100"/>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10,25,50,100, 200, 300, 400]"
      
      layout="sizes, prev, pager, next"
      :total="4552"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
</template>
<script>
import * as echarts from 'echarts'
import  * as XLSX from 'xlsx'
import moment from 'moment'

export default {
    name:'',
    components:{},
    props:{},
    data(){
        return{
            issueList:[],
            currentPage:1,
            wb:null,
            xlscList:[],
            pageSize:10,
            issuelists:[],
            versions:['all','v3.3.2', 'v3.4.0-rc1', 'v3.4.0-rc2', 'v3.4.0-rc3', 'v3.4.0-rc4', 'v3.4.0-rc5', 'v3.4.0', 'v3.2.4'],
            version:"all"
        }
    },
    created(){
      fetch('../data/data.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
    },
    methods:{
        selectChanged(value){
          if(value == "all"){
            fetch('../data/data.json')
            .then(response => response.json())
            .then(data => {
              this.issueLists = data;
              this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.3.2"){
            fetch('../data/data1.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.4.0-rc1"){
            fetch('../data/data2.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.4.0-rc2"){
            fetch('../data/data3.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.4.0-rc3"){
            fetch('../data/data4.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.4.0-rc4"){
            fetch('../data/data5.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.4.0-rc5"){
            fetch('../data/data6.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.4.0"){
            fetch('../data/data7.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
          if(value == "v3.2.4"){
            fetch('../data/data8.json')
      .then(response => response.json())
      .then(data => {
        this.issueLists = data;
        this.issueList = data.slice(0,10)
      });
          }
        },
        handleSizeChange(size){
            this.pageSize = size
            this.issueList = this.issueLists.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)             //将初始数据进行裁剪赋值给新数组
                
        },
        handleCurrentChange(index) {  
            let that = this     //currentPage变动时触发，index值为当前页前端实现分页
                this.currentPage = index
                this.issueList = this.issueLists.slice((index - 1) * this.pageSize, index * this.pageSize)             //将初始数据进行裁剪赋值给新数组
                console.log(this.issueList)
        },
        dateFormat: function (row, column) {
          var date = row[column.property]
          if (date === undefined) {
            return ''
          }
          return moment(date).format('YYYY-MM-DD')
    },
        importExcel(file) {
                let self = this;
                const types = file.name.split(".")[1];
                const fileType = ["xlsx", "xls", "csv"].some(
                  item => item === types
                );
             
                if (!fileType) {
                   alert("格式错误！请重新选择");
                  return;
                }
                this.file2Xce(file).then(tab => {
                  // console.log(tab)
                  if (tab && tab.length > 0) {
                    this.tab = tab;
                    if (this.tab.length != 0) {
                  
                      this.xlscList = [];
                      this.tab[0].sheet.forEach(item => {
                        // console.log(item.indexOf("C") != -1)
                       
                        if (item.indexOf("") != -1) {
                          let inputInfo = item.split("=",2);//excel的数据类型都是text所以通过item.split("'")截取，拿到所以表的数据
                          // console.log(inputInfo.length)
                          // if(inputInfo.length != 2){
                          //   console.log(inputInfo)
                          // }
                          if (inputInfo.length == 2) {
                            if(inputInfo[1][0] == "'")
                            self.xlscList.push(inputInfo[1].slice(1));
                            else{
                              self.xlscList.push(inputInfo[1])
                            }
                        
                          }
                          
                        }
                      });
                    }
                    if (this.xlscList.length != 0) {
                      this.setInputToForm();
                    }
                  }
                });
            },
            setInputToForm(){
                console.log(this.xlscList.length)
                if (this.xlscList.length >= 7) {//判断表头的长度
                  /*
                  * 将一个数组分成几个同等长度的数组
                  * array[分割的原数组]
                  * size[每个子数组的长度]
                  */
                  this.xlscList=this.xlscList.slice(7)
         
                  let result = [];
                  let personnelList = []
                  
                  for (var x = 0; x < Math.ceil(this.xlscList.length / 7); x++) {
                      var start = x * 7;
                      var end = start + 7;
                      result.push(this.xlscList.slice(start, end));
                  }
                  
                  //获取每一个数组的第一个，第二个，第三个...通过push重新拼装成一个新的数组对象
                  for(let i = 0;i<result.length;i++) {
                    for(let j = 0;j<result[i].length;j++) {
                      if(j == 0) {
                        personnelList.push({content:result[i][j],user:result[i][j+1],version:result[i][j+2],positive:result[i][j+3],negative:result[i][j+4],sentiment:result[i][j+5],date:result[i][j+6]})
                      }
                    }
                  }
                  this.issueLists = personnelList;
                 
                  this.handleCurrentChange(1);
                }else{
                  this.$message({
                    message: '上传格式不对',
                    type: 'warning'
                  })
                }
            },
            file2Xce(file) {
                return new Promise(function(resolve, reject) {
                  const reader = new FileReader();
                  reader.onload = function(e) {
                    const data = e.target.result;
                    this.wb = XLSX.read(data, {
                      type: "binary",
                      cellDates :true
                    });
                    const result = [];
                    this.wb.SheetNames.forEach(sheetName => {
                      result.push({
                        sheetName: sheetName,
                        sheet: XLSX.utils.sheet_to_formulae(this.wb.Sheets[sheetName])
                      });
                    });
                    resolve(result);
                  };
                  reader.readAsBinaryString(file.raw);
                });
            },
    },
    mounted() {
        var pieChart = echarts.init(this.$refs.pieChart)
        var pieOption={
            title:{
              text:"整体情况"
            },
            legend: {
                icon: 'circle',
                left: 'right',
                top: 280,
                data: ['Positive', 'Neutral', 'Negative']
            },
            tooltip:{
                trigger:'item',
                formatter : '{a}<br>{b}:{c}({d}%)'
            },
            series:[{
                name : '情绪',
                type:'pie',
                radius:"70%",
                center:['50%','60%'],
                data:[
                    {value:2641,name:'Positive'},
                    {value:4494,name:'Neutral'},
                    {value:2811,name:'Negative'}
                    
                ]
            }]
        }
        pieChart.setOption(pieOption)
        var lineChart = echarts.init(this.$refs.lineChart)
        var lineOption= {
            title: {
                text: 'issues情绪分析(点击横坐标版本名，查看饼状图)'
            },
            // // 提示框
            tooltip: {
                trigger: 'axis'
            },
    
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            // 工具栏
            toolbox: {
                feature: {
                    saveAsImage: {
                        type: 'png'
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack']
                    }
                }
            },
            xAxis: {
                type: 'category',
                
                data: ['v3.3.2', 'v3.4.0-rc1', 'v3.4.0-rc2', 'v3.4.0-rc3', 'v3.4.0-rc4', 'v3.4.0-rc5', 'v3.4.0', 'v3.2.4'],
                triggerEvent:true
            },
            yAxis: {
                type: 'value',
                axisLabel : {
                    formatter :'{value} %'
                }
            },
            series: [
                {
                    name: 'Positive',
                    type: 'line',
                    // smooth: true, // 平滑曲线显示
                    data: [16.8, 12.5, 5.3, 11.9, 17.4, 14.0, 23.3,12.3]
                },
                {
                    name: 'Neutral',
                    type: 'line',
                    // smooth: true,
                    data: [75.0, 78.4,90.9,78.0 , 73.7, 75.7, 69.0, 78.1]
                },
                {
                    name: 'Negative',
                    type: 'line',
                    // smooth: true,
                    data: [8.2, 9.1, 3.8, 10.1, 8.9, 10.3, 7.7,9.6]
                }
            ]
        }
        lineChart.setOption(lineOption)
        lineChart.on('click','xAxis.category',function(param){
            var clickName = param.value
            for(var i =0;i<lineOption.xAxis.data.length;i++){
              if(lineOption.xAxis.data[i] == clickName){
                pieOption.series[0].data[0].value = lineOption.series[0].data[i]
                pieOption.series[0].data[0].name = 'Positive'
                pieOption.series[0].data[1].value = lineOption.series[1].data[i]
                pieOption.series[0].data[1].name = 'Neutral'
                pieOption.series[0].data[2].value = lineOption.series[2].data[i]
                pieOption.series[0].data[2].name = 'Negative'
              }
            }
            pieChart.setOption(pieOption)
              
           
        })
    }
}
</script>
<style>
    #lineChart{
        position: fixed;
        left: 0px;
        top: 375px;
       opacity: 0.9;
    }
    #pieChart{
        position: fixed;
        left:0px;
        top: 60px;
        opacity: 0.9;
    }
    .showData {
        position: fixed;
        opacity: 0.8;
        right: 0px;
    }

</style>