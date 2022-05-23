import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { browseTreeNode } from '../../../redux/slices/mainslice';
import { nodeIsBrowsed } from '../../../redux/slices/utils';
import { TreeView, Grid, GridItem } from '@patternfly/react-core';
import styles from './nodepanel.module.css';

const NodePanel = () => {
    let tree = useSelector(state => state.nodesTree);
    let serverUrl = useSelector(state => state.serverUrl);
    let dispatch = useDispatch();

    let onSelectHandler = (_e, item) => {
        let nodeId = item.id;
        if (!nodeIsBrowsed(tree, nodeId)) {
            let browseConfig = {
                serverUrl: serverUrl,
                nodeId: nodeId
            }
            dispatch(browseTreeNode(browseConfig));
            console.log("Browsing...")
        } else {
            console.log('Node is already browsed');
        }
    }

    return (
        <Grid>
            <GridItem span={10} offset={1}>
                <div className={styles.container}>
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