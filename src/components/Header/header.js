import React from 'react';
import { Masthead, MastheadMain, MastheadBrand } from '@patternfly/react-core';

const Header = () => {
    return (
        <Masthead>
            <MastheadMain>
                <MastheadBrand href='#'>
                    OPC UA Client - Yacoub Automation
                </MastheadBrand>
            </MastheadMain>
        </Masthead>
    );
}

export default Header;