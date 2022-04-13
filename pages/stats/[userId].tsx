import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from "baseui/list";
import { Check } from "baseui/icon";
// import { Axis, BarSeries, Chart, Position, ScaleType, Settings } from '@elastic/charts';
// import '@elastic/charts/dist/theme_light.css';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router'
import { Input } from 'baseui/input';



export default function Analytics() {
    const router = useRouter()
    const { userId } = router.query
    const [{ transactionDetails }, setData] = useState<any>({})

    // console.log('user:', user)

    useEffect(() => {
        const stat = async () => {
            const request = await fetch(`${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/stats/${userId}`, {
                method: "GET",
            })
            const data = await request.json()
            console.log('data:', data)

            setData(data)
        }
        stat()
    }, [])



    const stats = [
        { label: 'Total credit transactions', amount: 1000 },
        { label: 'Total cash inflow (ex loans)', amount: 100 },
        { label: 'Total cash inflow (ex loans, ex suppliers)', amount: 100 },
        { label: 'Total to own bank + savings + Mpesa balance increase', amount: 100 },
        { label: 'Average positive Mpesa balance', amount: 3000 },
    ]

    const Graph = () => {
        if (transactionDetails?.aggregations.week) {
            // const specId = 'first bar'
            // const formatData = transactionDetails.aggregations.week.buckets.map(item => { return ({ x: item.incomming.value, y: item.key_as_string, v: item.outgoing.value }) })
            // return null
            return null
            // <Chart size={{ height: 400, width: 800 }}>
            //     {/* <Settings baseTheme={useBaseTheme()} /> */}
            //     <BarSeries
            //         id={specId}
            //         name="Simple bar series"
            //         xScaleType={ScaleType.Linear}
            //         yScaleType={ScaleType.Linear}
            //         xAccessor="y"
            //         yAccessors={[`x`, 'v']}
            //         data={formatData}
            //     />
            // </Chart>

        }

        return null
    }

    const TransactionList = () => {
        return (
            <ListItem
                artwork={props => <Check {...props} />}
                endEnhancer={() => (
                    <ListItemLabel>100 kes</ListItemLabel>
                )}
            >
                {/* <ListItemLabel>Label</ListItemLabel> */}
                <ListItemLabel description="description">
                    some Titel
                </ListItemLabel>
            </ListItem>
        )
    }

    const TransactionSearch = () => {
        const [value, setValue] = React.useState("");
        return (
            <Input
                value={value}
                onChange={(e) => {
                    const val: any = e.target as Element
                    setValue(val.value)
                }}
                placeholder="Search in description or amount"
            // clearOnEscape
            />
        )
    }

    return (
        <div>
            <div>
            </div>

            <Graph />

            <div>
                <Outer>
                    <Grid>
                        {stats.map((item) => {
                            return <Cell key={item.label} span={[1, 2, 6]}>
                                <Inner>
                                    <ListItem
                                        artwork={props => <Check {...props} />}
                                        endEnhancer={() => (
                                            <ListItemLabel>{item.amount} KES</ListItemLabel>
                                        )}
                                    >
                                        <ListItemLabel>{item.label}</ListItemLabel>
                                    </ListItem>
                                </Inner>
                            </Cell>
                        })}
                    </Grid>
                </Outer>
            </div>
            <div>
                <h2>Top 10 most found transactions interactions</h2>
                {transactionDetails?.aggregations?.name?.buckets.map((item) => {
                    return (<Cell key={item.key} span={[1, 5, 12]}>
                        <Inner>
                            <ListItem
                                // artwork={props => <Check {...props} />}
                                endEnhancer={() => (
                                    <ListItemLabel>{item.key}</ListItemLabel>
                                )}
                            >
                                {/* <ListItemLabel>description</ListItemLabel> */}
                            </ListItem>
                        </Inner>
                    </Cell>)
                })}

            </div>

            <div>
                <p>Transaction overview</p>
                <TransactionSearch />
                <TransactionList />
            </div>
        </div>
    )
}



const Outer: React.FunctionComponent<{}> = ({ children }) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                background: theme.colors.accent100,
            })}
        >
            {children}
        </div>
    );
};
const Inner: React.FunctionComponent<{}> = ({ children }) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                background: theme.colors.accent200,
                color: theme.colors.accent700,
                padding: '.25rem',
            })}
        >
            {children}
        </div>
    );
};