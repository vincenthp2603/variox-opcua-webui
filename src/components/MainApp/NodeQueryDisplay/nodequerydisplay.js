import { Grid, GridItem } from "@patternfly/react-core";
import JsonTable from "./JsonTable/jsontable";
import styles from './nodequerydisplay.module.css';
import { useSelector } from "react-redux";

const NodeQueryDisplay = () => {
    let queryData = useSelector(state => state.selectedNode.queryData);
    let queryDisplay = (
        <Grid>
            <GridItem span={10} offset={1}>
                <div className={styles.container}>
                    <JsonTable data={queryData}/>
                </div>
            </GridItem>
        </Grid>
    )

    return queryData ? queryDisplay : null;
}

export default NodeQueryDisplay;