import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { browse, query, formatTreeNode, updateTreeNode, getNodeById } from './utils'

let rootNode = {
    name: 'Root',
    id: 'RootFolder',
    browseName: 'RootFolder',
    nodeClass: 'Object',
    hasChildren: true,
    children: []
}

const initialTree = [rootNode];

const initialState = {
    serverUrl: 'opc.tcp://opcuaserver.com:48010',
    searchUrl: 'opc.tcp://opcuaserver.com:48010',
    nodesTree: [ ...initialTree ],
    selectedNode: { ...rootNode, queryData: undefined }
}

export const browseTreeNode = createAsyncThunk(
    'main/browseTreeNode',
    async (nodeId, { getState }) => {
        try {
            let serverUrl = getState().serverUrl;
            let nodeBrowseData = await browse(serverUrl, nodeId);
            return formatTreeNode(nodeBrowseData);
        } catch (err) {
            console.log(err);
        }        
    }
)

export const queryTreeNode = createAsyncThunk(
    'main/queryTreeNode',
    async (nodeId, { getState }) => {
        try {
            let serverUrl = getState().serverUrl;
            let nodeQueryData = await query(serverUrl, nodeId);
            return nodeQueryData;
        } catch (err) {
            console.log(err);
        }
    }
)

const queryTreeNodeSuccess = (state, action) => {
    console.log("Query Success!")
    let queryNodeId = action.payload.id;
    if (queryNodeId === state.selectedNode.id) {
        state.selectedNode.queryData = { ...action.payload.queryData }
    }
}

const browseTreeNodeSuccess = (state, action) => {
    let tree = [ ...state.nodesTree ];
    let nodeId = action.payload.id;
    let updatedData = action.payload; 
    
    let updatedTree = updateTreeNode(tree, nodeId, updatedData);
    //console.log(updatedTree);
    state.nodesTree = [ ...updatedTree ];
}

const updateSearchUrlReducer = (state, action) => {
    state.searchUrl = action.payload;
}

const updateServerUrlReducer = (state, action) => {
    state.serverUrl = action.payload;
    state.nodesTree = [ ...initialTree ]
}

const selectTreeNodeReducer = (state, action) => {
    let tree = [ ...state.nodesTree ];
    let nodeId = action.payload;
    state.selectedNode = { 
        ...getNodeById(tree, nodeId), 
        queryData: { ...state.selectedNode.queryData }
    };
}

const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        updateServerUrl: updateServerUrlReducer,
        updateSearchUrl: updateSearchUrlReducer,
        selectTreeNode: selectTreeNodeReducer
    },
    extraReducers: (builder) => {
        builder.addCase(browseTreeNode.fulfilled, browseTreeNodeSuccess);
        builder.addCase(queryTreeNode.fulfilled, queryTreeNodeSuccess);
    }
})


export const { updateServerUrl, updateSearchUrl, selectTreeNode } = mainSlice.actions;

export default mainSlice.reducer