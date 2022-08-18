import { visualConfig } from './visual-config.js';
import http from './http.js';
import { deepCopy } from './deepCopy'
import store from './storeindex'
/**
 * 定义存入sessionStorage的key
 */
export const localKey = 'PAGE_DATA_KEY';
/**
 * 定义注入jsonData的key
 */
export const injectKey = Symbol();

/* TAG 打印当前组件最大的key */
let currentLatestKey = Object.keys(visualConfig.componentMap).reduce(
    (prev, curr) => Math.max(prev, +visualConfig.componentMap[curr].key),
    0
)
console.log('当前组件最大的Key:', currentLatestKey)
/* TAG */

export default {
    namespaced: true,
    state: {
        pageId: null,
        visualConfig: visualConfig,
        jsonData: { blocks: [] },
        currentBlock: {},
        snapshotData: [], // 快照数据-撤销操作使用
        snapshotIndex: -1, // 快照索引
    },
    mutations: {
        setCurrentBlock: (state, block) => {
            state.currentBlock = block;
        },
        updateDynmConfig: (state, block) => {
            state.currentBlock.dynmConfig = block
        },
        updateDynm: (state, block) => {
            state.currentBlock.props.dynm = block
        },
        updatePrometheusOptions: (state, data) => {
            state.currentBlock.prometheusOptions = data
        },
        updatePrometheus: (state, data) => {
            state.currentBlock.props.prometheus = data
        },
        updatePrometheusValue: (state, data) => {
            state.currentBlock.props.prometheus[data.key] = data.value
        },
        updatePageBlock: (state, blocks) => {
            state.jsonData.blocks = blocks;
            store.commit('canvasData/recordSnapshot')
        },
        addIdxBlock (state, block, index) {
            state.jsonData.blocks.splice(index, 0, block);
        },
        pushBlock (state, block) {
            state.jsonData.blocks.push(block);
            store.commit('canvasData/recordSnapshot')
        },
        clearAndSetFocus (state, index) {
            for (let i = 0; i < state.jsonData.blocks.length; i++) {
                state.jsonData.blocks[i].focus = false;
            }
            if(typeof index == "number"){
                state.jsonData.blocks[index].focus = true;
            }
            
        },
        deleteBlock (state, index) {
            if(typeof index == "number"){
                let [block] = state.jsonData.blocks.splice(index, 1);
                const reg = /\.(png|jpg|gif|jpeg|webp)$/;
                let arr = [];
                Object.entries(block.props).forEach(([key, value]) => {
                    if (reg.test(value)) {
                        arr.push(value);
                    }
                });
                if (arr.length) {
                    http
                        .delete('/api/files', {
                            data: {
                                fileName: arr,
                                dashboardId: state.pageId
                            }
                        })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                    });
                }
                store.commit('canvasData/recordSnapshot')
            }
            
        },
        // 静态数据添加到jsonData
        dataScoreTojsonDataData (state, data) {
            state.currentBlock['model'] = data
        },
        // 添加modelID
        addmodelId (state, data) {
            let vid = state.currentBlock._vid;
            // 获取所有的组件快
            let blocks = state.jsonData.blocks;
            // 获取符合条件的索引
            let editBlockIndex = blocks.findIndex((item) => item._vid === vid);
            state.jsonData.blocks[editBlockIndex]['modelId'] = data.modelId;
            state.jsonData.blocks[editBlockIndex]['refreshFreq'] = data.refreshFreq;
            state.jsonData.blocks[editBlockIndex]['limit'] = data.limit;
            state.jsonData.blocks[editBlockIndex]['listenEvent'] = data.listenEvent;
            state.jsonData.blocks[editBlockIndex]['condition'] = data.condition;
            state.jsonData.blocks[editBlockIndex]['mappingRelations'] = data.mappingRelations;
            state.jsonData.blocks[editBlockIndex]['fieldNames'] = data.fieldNames;
            state.jsonData.blocks[editBlockIndex]['orderByField'] = data.orderByField;
            state.jsonData.blocks[editBlockIndex]['orderBy'] = data.orderBy;
            // 普罗米修斯新增
            state.jsonData.blocks[editBlockIndex]['url'] = data.url;
            state.jsonData.blocks[editBlockIndex]['modelIdArr'] = data.modelIdArr;
            state.jsonData.blocks[editBlockIndex]['queryList'] = data.queryList;
            state.jsonData.blocks[editBlockIndex]['step'] = data.step;            
            state.jsonData.blocks[editBlockIndex]['date'] = data.date;
            state.jsonData.blocks[editBlockIndex]['dateType'] = data.dateType;
            state.jsonData.blocks[editBlockIndex]['urlStr'] = data.urlStr;
            // api新增
            state.jsonData.blocks[editBlockIndex]['apiUrl'] = data.apiUrl;
            state.jsonData.blocks[editBlockIndex]['requestMode'] = data.requestMode;
            state.jsonData.blocks[editBlockIndex]['dataFilter'] = data.dataFilter;
            state.jsonData.blocks[editBlockIndex]['dataSourceName'] = data.dataSourceName;
            state.jsonData.blocks[editBlockIndex]['headers'] = data.headers;
            state.jsonData.blocks[editBlockIndex]['requestBody'] = data.requestBody;
            state.jsonData.blocks[editBlockIndex]['isServe'] = data.isServe;
            state.jsonData.blocks[editBlockIndex]['category'] = data.category;
            state.jsonData.blocks[editBlockIndex]['NumberValueSelect'] = data.NumberValueSelect;
            state.jsonData.blocks[editBlockIndex]['apiItems'] = data.apiItems;
        },
        // 静态数据提交清空modelid
        clearmodelId (state) {
            let vid = state.currentBlock._vid;
            // 获取所有的组件快
            let blocks = state.jsonData.blocks;
            // 获取符合条件的索引
            let editBlockIndex = blocks.findIndex((item) => item._vid === vid);
            state.jsonData.blocks[editBlockIndex]['modelId'] = '';
        },
        setPageId (state, pageId) {
            state.pageId = pageId
        },
        /**
         * 设置modelType
         */
        setModelType (state, modelType) {
            state.currentBlock['modelType'] = modelType
        },
        topComponent(state, data){
            let max=0
            let select=state.jsonData.blocks[data].styles.zIndex
            let index
            for (let i = 0; i < state.jsonData.blocks.length; i++) {
                if(state.jsonData.blocks[i].styles.zIndex*1>max){
                    max=state.jsonData.blocks[i].styles.zIndex
                    index=i
                }
            }

            if(max<=select){
                this._vm.$Message.warning('已经是置顶状态');
            }else{
                state.jsonData.blocks[data].styles.zIndex=max
                state.jsonData.blocks[index].styles.zIndex=select
            }
            
        },
        bottomComponent(state, data){
            let min=state.jsonData.blocks[data].styles.zIndex
            let select=state.jsonData.blocks[data].styles.zIndex
            let index
            for (let i = 0; i < state.jsonData.blocks.length; i++) {
                if(state.jsonData.blocks[i].styles.zIndex*1<min){
                    min=state.jsonData.blocks[i].styles.zIndex
                    index=i
                }
            }

            if(min>=select){
                this._vm.$Message.warning('已经是置底状态');
            }else{
                state.jsonData.blocks[data].styles.zIndex=min
                state.jsonData.blocks[index].styles.zIndex=select
            }
            
        },
        lockComponent(state, data){
            state.jsonData.blocks[data.index].isLock=data.isLock
        },
        recordSnapshot(state) {
            // 添加新的快照
            state.snapshotData[++state.snapshotIndex] = deepCopy(state.jsonData.blocks)
            // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
            if (state.snapshotIndex < state.snapshotData.length - 1) {
                state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
            }
        },
        undo(state) {
            if (state.snapshotIndex >= 0) {
                state.snapshotIndex--
                const componentData = deepCopy(state.snapshotData[state.snapshotIndex]) || []
                if (state.currentBlock) {
                    // 如果当前组件不在 componentData 中，则置空
                    const needClean = !componentData.find(component => state.currentBlock._vid === component._vid)

                    if (needClean) {
                        store.commit('canvasData/setCurrentBlock', {})
                    }
                }
                state.jsonData.blocks = componentData;
            }
        },
        resetSnapshot(state){
            state.snapshotData=[]
            state.snapshotIndex=-1
        }
    },
    actions: {
        addBlock: ({ commit }, block, index = null) => {
            if (index !== null) {
                commit('addIdxBlock', block, index);
                return;
            }
            commit('pushBlock', block);
            commit('setCurrentBlock', block);
        },
        setFocus: ({ commit }, index) => {
            commit('clearAndSetFocus', index);
        },
        // 静态数据添加到json
        dataScoreTojsonData: ({ commit }, index) => {
            commit('dataScoreTojsonDataData', index);
        },
        // modelId添加
        addmodelId: ({ commit }, index) => {
            commit('addmodelId', index);
        },
        clearmodelId: ({ commit }) => {
            commit('clearmodelId');
        },
        topComponent: ({ commit }, index) => {
            commit('topComponent', index);
        },
        bottomComponent: ({ commit }, index) => {
            commit('bottomComponent', index);
        },
        lockComponent: ({ commit }, data) => {
            commit('lockComponent', data);
        },
    }
};
