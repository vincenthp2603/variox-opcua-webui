import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchInput, Grid, GridItem } from '@patternfly/react-core';
import { updateSearchUrl  } from '../../../redux/slices/mainslice';

const SearchBar = () => {

    let searchUrl = useSelector(state => state.searchUrl);
    let dispatch = useDispatch();

    return (
        <Grid>
            <GridItem span={8} offset={2}>
                <SearchInput
                    placeholder='Enter Server URL'
                    value={searchUrl}
                    onChange={(value) => dispatch(updateSearchUrl(value))}
                />
            </GridItem>
        </Grid>
    )
}

export default SearchBar;