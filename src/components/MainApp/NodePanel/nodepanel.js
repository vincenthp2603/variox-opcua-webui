import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { browseTreeNode, queryTreeNode, selectTreeNode } from '../../../redux/slices/mainslice';
import { nodeIsBrowsed } from '../../../redux/slices/utils';
import { TreeView, Grid, GridItem } from '@patternfly/react-core';
import styles from './nodepanel.module.css';
import { clearIntervals } from './utils';

const NodePanel = () => {
    let tree = useSelector(state => state.nodesTree);
    let serverUrl = useSelector(state => state.serverUrl);
    let dispatch = useDispatch();

    let onSelectHandler = (_e, item) => {
        let nodeId = item.id;
        dispatch(selectTreeNode(nodeId));
        if (!nodeIsBrowsed(tree, nodeId)) {
            dispatch(browseTreeNode(nodeId));
        }
        clearIntervals();
        dispatch(queryTreeNode(nodeId));
        setInterval(() => {
            dispatch(queryTreeNode(nodeId));
        }, 1000);
    }

    return (
        <Grid>
            <GridItem span={12}>
                <div className={styles.container}>
                    <div>
                        <b>Endpoint: </b> {serverUrl}
                    </div>
                    <TreeView
                        data={tree}
                        onSelect={(e, item) => onSelectHandler(e, item)}
                    />
                </div>
            </GridItem>
        </Grid>
    )
}

export default NodePanel;