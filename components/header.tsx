import * as React from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";

export default () => {
    return (
        <HeaderNavigation
            overrides={{
                Root: {
                    style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning200} solid`,
                        backgroundColor: $theme.colors.warning200
                    })
                }
            }}
        >
            <StyledNavigationList $align={ALIGN.left}>
                <StyledNavigationItem>Uber</StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center} />
            <StyledNavigationList $align={ALIGN.right}>
                <StyledNavigationItem>
                    <StyledLink href="#basic-link1">
                        Tab Link One
          </StyledLink>
                </StyledNavigationItem>
                <StyledNavigationItem>
                    <StyledLink href="#basic-link2">
                        Tab Link Two
          </StyledLink>
                </StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.right}>
                <StyledNavigationItem>
                    <Button>Get started</Button>
                </StyledNavigationItem>
            </StyledNavigationList>
        </HeaderNavigation>
    );
}