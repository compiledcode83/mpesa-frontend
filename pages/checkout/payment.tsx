import * as React from 'react';
import { Button } from 'baseui/button';
import { useRouter } from "next/router";
import {
    Card,
    StyledBody,
    StyledAction,
    StyledHeaderImage,
    StyledTitle
} from 'baseui/card';
import { useStyletron } from 'baseui';

export default function Payment() {
    const [css] = useStyletron();
    const router = useRouter();


    return (
        <div style={{
            display: "flex",
            justifyContent: 'center',
            marginTop: 100

        }}>
            <Card
                overrides={{ Root: { style: { width: '500px' } } }}
            >
                <div style={{
                    position: "relative",
                    // top: "50%",
                    left: "40%"
                }}>
                    <StyledHeaderImage
                        className={css({
                            width: '100px',
                        })}
                        src='/images/seviS.svg'
                    />
                </div>
                <StyledTitle overrides={{ BaseButton: { style: { width: '100%' } } }}>
                    Order successfull
                </StyledTitle>
                <StyledBody>
                    To proceed select your payment plan in the app.
                </StyledBody>
                <StyledAction>
                    <Button onClick={() => router.push('https://sevi.io/app')} overrides={{ BaseButton: { style: { width: '100%' } } }}>
                        OPEN SEVI APP
        </Button>
                </StyledAction>
            </Card>
        </ div>
    );
}