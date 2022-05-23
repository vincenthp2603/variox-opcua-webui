import React from "react";
import { Grid, GridItem } from "@patternfly/react-core";
import NodePanel from "./NodePanel/nodepanel";

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
                            Display
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    )
}

export default MainApp;