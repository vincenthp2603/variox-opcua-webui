import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { browse, formatTreeNode, updateTreeNode } from './utils'

const initialTree = [
    {
        name: 'Root',
        id: 'RootFolder',
        hasChildren: true,
        children: []
    }
]

const initialState = {
    serverUrl: 'opc.tcp://opcuaserver.com:48010',
    searchUrl: 'opc.tcp://opcuaserver.com:48010',
    nodesTree: [ ...initialTree ]
}

export const browseTreeNode = createAsyncThunk(
    'main/browseTreeNode',
    async (config) => {
        try {
            console.log(config);
            let { serverUrl, nodeId } = { ...config }
            let nodeBrowseData = await browse(serverUrl, nodeId);
            return formatTreeNode(nodeBrowseData);
        } catch (err) {
            console.log(err);
        }        
    }
)

const browseTreeNodeSuccess = (state, action) => {
    let tree = [ ...state.nodesTree ];
    let nodeId = action.payload.id;
    let updatedData = action.payload; 
    
    let updatedTree = updateTreeNode(tree, nodeId, updatedData);
    state.nodesTree = [ ...updatedTree ]
}

const updateSearchUrlReducer = (state, action) => {
    state.searchUrl = action.payload;
}

const updateServerUrlReducer = (state, action) => {
    state.serverUrl = action.payload;
    state.nodesTree = [ ...initialTree ]
}

const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        updateServerUrl: updateServerUrlReducer,
        updateSearchUrl: updateSearchUrlReducer
    },
    extraReducers: (builder) => {
        builder.addCase(browseTreeNode.fulfilled, browseTreeNodeSuccess)
    }
})


export const { updateServerUrl, updateSearchUrl } = mainSlice.actions;

export default mainSlice.reducer