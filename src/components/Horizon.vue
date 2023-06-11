<template>
    <div id = "line" style="text-align: -webkit-center;"></div>
</template>
<script>
    export default{
        name:'Horizon'
    }
</script>
<style>
    #line{
        height: 2px;
        width: 500px;
        background: -webkit-linear-gradient(left,rgba(255, 255, 255, 0),#a1dd5d,rgba(255,255,255,0));
        background: linear-gradient(to right, rgba(255, 255, 255, 0),#a1dd5d,rgba(255,255,255,0));
    }
</style>