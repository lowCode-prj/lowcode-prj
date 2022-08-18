<template>
    <div class="screen">
            <!-- 引入组件icon1560080458415788032 -->
            <div class="icon1560080458415788032">
                <icon1560080458415788032></icon1560080458415788032>
            </div>
            <!-- 引入组件icon1560080458428370944 -->
            <div class="icon1560080458428370944">
                <icon1560080458428370944></icon1560080458428370944>
            </div>
            <!-- 引入组件icon1560080458440953856 -->
            <div class="icon1560080458440953856">
                <icon1560080458440953856></icon1560080458440953856>
            </div>
            <!-- 引入组件title1560080458457731072 -->
            <div class="title1560080458457731072">
                <title1560080458457731072></title1560080458457731072>
            </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    //引入总线事件以实现大屏组件之间事件的联动
    Vue.prototype.$bus = new Vue();
    // 组件存放的路径 (示例:前端code中vue的相对路径)
    import icon1560080458415788032 from './icon1560080458415788032.vue'

    import icon1560080458428370944 from './icon1560080458428370944.vue'

    import icon1560080458440953856 from './icon1560080458440953856.vue'

    import title1560080458457731072 from './title1560080458457731072.vue'

    export default {
        components: {
            icon1560080458415788032,
            icon1560080458428370944,
            icon1560080458440953856,
            title1560080458457731072
        }
    };
</script>

<style lang='less' scoped>
    .screen {
        position: relative;
        width: 1920px;
        height: 1080px;
        background-size: 100% 100%;
        background-color: #232323;
    }
    .icon1560080458415788032{
        height: 100px;
        width: 100px;
        background-color: rgba(34,40,51,0);
        position: absolute;
        top:375px;
        left:679px;
        z-index: 1;
    }
    .icon1560080458428370944{
        height: 100px;
        width: 100px;
        background-color: rgba(34,40,51,0);
        position: absolute;
        top:375px;
        left:868px;
        z-index: 2;
    }
    .icon1560080458440953856{
        height: 100px;
        width: 100px;
        background-color: rgba(34,40,51,0);
        position: absolute;
        top:375px;
        left:1071px;
        z-index: 3;
    }
    .title1560080458457731072{
        height: 50px;
        width: 420px;
        background-color: rgba(34,40,51,0);
        position: absolute;
        top:210px;
        left:722px;
        z-index: 3;
    }
</style>

