import axios from "axios";

export async function browse(serverUrl, nodeId) {
    try {
        let response = await axios({
            method: 'post',
            url: 'http://localhost:8000/browse',
            data: {
                serverurl: serverUrl,
                nodeId: nodeId
            }
        })
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export function formatTreeNode(browseData) {
    let rootnode = { ...browseData };

    rootnode.hasChildren = browseData.hasChildren;
    if (browseData.nodeId === "RootFolder") {
        rootnode.id = "RootFolder";
        rootnode.name = "Root";
        rootnode.browseName = "RootFolder"
    } else {
        rootnode.id = browseData.nodeId;
        rootnode.name = browseData.displayName;
        rootnode.browseName = browseData.browseName;
    }
    
    if (browseData.hasChildren) {
        rootnode.children = [];
        for (let child of browseData.children) {
            let childNode = formatTreeNode(child);
            rootnode.children.push(childNode);
        } 
    } else {
        rootnode.children = undefined;
    }

    return rootnode;
}

export function updateTreeNode(tree, nodeId, updatedData) {
    return tree.map(node => {
        if (node.id === nodeId) {
            return {
                ...node,
                children: [ ...updatedData.children ]
            }
        } else if (node.hasChildren) {
            return {
                ...node,
                children: updateTreeNode(node.children, nodeId, updatedData)
            }
        }
        return { ...node }
    })
}

export function nodeIsBrowsed(tree, nodeId) {
    let tmpResult = true;
    let result = true; 
    for (let node of tree) {
        if (node.id === nodeId) {
            if (node.hasChildren && node.children.length === 0) {
                return false;
            }
        }
        if (node.hasChildren && node.children.length !== 0) {
            tmpResult = nodeIsBrowsed(node.children, nodeId);
        }
        result = result && tmpResult;
    }
    return result;
}