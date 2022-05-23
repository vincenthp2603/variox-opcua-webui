import React from "react";
import { Button } from "@patternfly/react-core";
import SearchBar from "./SearchBar/searchbar";
import styles from "./searchinputblock.module.css";

import { useSelector, useDispatch } from "react-redux";
import { browseTreeNode, updateServerUrl } from "../../redux/slices/mainslice";

const SearchInputBlock = () => {
    let dispatch = useDispatch();
    let searchstr = useSelector(state => state.searchUrl);

    let onClickHandler = () => {
        let browseConfig = {
            serverUrl: searchstr,
            nodeId: "RootFolder"
        }
        dispatch(updateServerUrl(searchstr));
        dispatch(browseTreeNode(browseConfig));
    }

    return (
        <div className={styles.mainBlock}>
            <SearchBar />
            <Button 
                variant="primary"
                className={styles.searchBtn}
                onClick={onClickHandler}
            >
                Browse
            </Button>
            <div className={styles.errorMessage}>Placeholder for error message</div>
        </div>
    )
}

export default SearchInputBlock;


