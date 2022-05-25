import { useSelector } from "react-redux";
import { Grid, GridItem } from "@patternfly/react-core";
import styles from './nodebrowsedisplay.module.css';

const NodeBrowseDisplay = () => {
    let selectedNode = useSelector(state => state.selectedNode);

    return (
        <Grid>
            <GridItem span={10} offset={1}>
                <div className={styles.container}>
                    <div><b>Node ID:</b> {selectedNode.id}</div>
                    <div><b>Browse Name:</b> {selectedNode.browseName}</div>
                    <div><b>Node Class:</b> {selectedNode.nodeClass}</div>
                </div>
            </GridItem>
        </Grid>
    )
}

export default NodeBrowseDisplay;