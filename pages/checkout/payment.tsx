
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Button } from 'baseui/button';
import { useRouter } from 'next/router'
import Image from 'next/image'

const Payment = () => {
    const router = useRouter()

    return (
        <div
            style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "center",
                alignContent: "center"
            }}
        >
            <Card
                overrides={{ Root: { style: { width: '328px' } } }}
                headerImage={
                    '/sevi.svg'
                }
                title="Select payment plan"
            >
                <StyledBody>
                    In the app you are able to select between, Pay now and Pay later.
                        </StyledBody>
                <StyledAction>
                    <Button onClick={() => { router.push("/mobile"); }} overrides={{ BaseButton: { style: { width: '100%', marginTop: "10px" } } }}>
                        Sevi app
            </Button>

                    <Button overrides={{ BaseButton: { style: { width: '100%', marginTop: "10px" } } }}>
                        back to store
        </Button>
                </StyledAction>
            </Card>
        </div>
    )
}

export default Payment