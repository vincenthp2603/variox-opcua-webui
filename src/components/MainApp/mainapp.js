import React from "react";
import { Grid, GridItem } from "@patternfly/react-core";
import NodePanel from "./NodePanel/nodepanel";
import NodeBrowseDisplay from "./NodeBrowseDisplay/nodebrowsedisplay";
import NodeQueryDisplay from "./NodeQueryDisplay/nodequerydisplay";

const MainApp = () => {
    return (
        <div>
            <Grid>
                <GridItem span={10} offset={1}>
                    <Grid>
                        <GridItem span={6}>
                            <NodePanel />
                        </GridItem>
                        <GridItem span={6}>
                            <Grid>
                                <GridItem span={12}>
                                    <NodeBrowseDisplay />
                                </GridItem>
                                <GridItem span={12}>
                                    <NodeQueryDisplay />
                                </GridItem>
                            </Grid>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    )
}

export default MainApp;