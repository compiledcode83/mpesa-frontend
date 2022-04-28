import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from "baseui/list";
import { Check } from "baseui/icon";
import { Axis, BarSeries, Chart, Position, ScaleType, Settings, Goal, BandFillColorAccessorInput } from '@elastic/charts';
import '@elastic/charts/dist/theme_light.css';
// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useRouter } from 'next/router'
import { Input } from 'baseui/input';
import { GoalSubtype } from '@elastic/charts/dist/chart_types/goal_chart/specs/constants';
import {useBasicTransactionsStat, useSearchTransactions, useTransactionRange} from '../api/transactions';

export default function Analytics() {
    const { query: { userId } } = useRouter()
    const [{ user, transactions }, isLoading] = useBasicTransactionsStat(userId);
    const [searchTransactions, loadTransactions] = useSearchTransactions(userId);
    // const [rangeAvg, loadRangeAvg] = useTransactionRange(userId);

    if (isLoading) return (
        <div>
            <p>loading</p>
        </div>
    )

    const stats = [
        { label: 'Total cash inflow (ex loans)', amount: transactions?.totalCashData.hits.total.value },
        { label: 'Average positive Mpesa balance', amount: Math.round(transactions?.avg3monthData.aggregations.avgPositiveBalance.avgPositive.value) },
        { label: 'Total In', amount: transactions?.avg3monthData.aggregations.totalIn.value },
        { label: 'Total Out', amount: transactions?.avg3monthData.aggregations.totalOut.total.value },
        { label: 'Personal transactions count', amount: transactions?.personalTransactionData.hits.total.value },
        // { label: 'Total credit transactions', amount: 1000 },
        // { label: 'Total cash inflow (ex loans, ex suppliers)', amount: 100 },
        // { label: 'Total to own bank + savings + Mpesa balance increase', amount: 100 },
    ]

    const Graph = () => {
        if (user?.transactionDetails?.aggregations?.week) {
            const specId = 'first bar'
            // const formatData = user?.transactionDetails.aggregations.week.buckets.map(item => { return ({ x: item.incomming.value, y: item.key_as_string, v: item.outgoing.value }) })
            const sumDailyIn = transactions?.avg3monthData.aggregations.avgDaily.sumDailyIn || [];
            const sumDailyOut = transactions?.avg3monthData.aggregations.avgDaily.sumDailyOut || [];
            const formatData = sumDailyIn.buckets.map((item, index) => { return ({ x: item.daySum.value, y: item.key_as_string, v: sumDailyOut.buckets[index].daySum.value }) })
            return (
                < Chart size={{ height: 400, width: 800 }}>
                    {/* <Settings baseTheme={useBaseTheme()} /> */}
                    < BarSeries
                        id={specId}
                        name="in and out transactions sum per day"
                        xScaleType={ScaleType.Linear}
                        yScaleType={ScaleType.Linear}
                        xAccessor="y"
                        yAccessors={[`x`, 'v']}
                        data={formatData}
                    />
                </Chart >
            )
        }

        return null
    }

    const TransactionList = () => {
        return (
            <Grid>
            {searchTransactions.map((item, index) => {
                    return (<Cell key={index} span={[1, 5, 12]}>
                        <Inner>
                            <ListItem
                                // artwork={props => <Check {...props} />}
                            >
                                <ListItemLabel>{item.description}</ListItemLabel>
                                <ListItemLabel>{item.amount}</ListItemLabel>
                            </ListItem>
                        </Inner>
                    </Cell>)
                })}
                </Grid>
            // <ListItem
            //     artwork={props => <Check {...props} />}
            //     endEnhancer={() => (
            //         <ListItemLabel>100 kes</ListItemLabel>
            //     )}
            // >
            //     {/* <ListItemLabel>Label</ListItemLabel> */}
            //     <ListItemLabel description="description">
            //         some Titel
            //     </ListItemLabel>
            // </ListItem>
        )
    }

    const TransactionSearch = () => {
        const [searchText, setSearchText] = useState("");

        const loadResult = (val) => {
            setSearchText(val);
            if (val.length > 3) {
                loadTransactions(val);
            }
        }

        return (
            <Input
                type="text"
                value={searchText}
                onChange={(e) => {
                    e.preventDefault();
                    const val: any = e.target as Element
                    loadResult(val.value)
                }}
                placeholder="Search in description or amount"
            // clearOnEscape
            />
        )
    }

    const Range = () => {
        const avgDailyIn = Math.round(transactions?.avg3monthData?.aggregations?.avgDaily.avgDailyIn.value) || 0
        const avgDailyOut = Math.round(transactions?.avg3monthData?.aggregations?.avgDaily.avgDailyOut.value) || 0

        return (
            <Grid>
            <Chart size={{ height: 400, width: 400 }}>
                {/* <Settings baseTheme={useBaseTheme()} /> */}
                <Goal
                    id="spec_1"
                    subtype={GoalSubtype.Goal}
                    base={200}
                    target={3000}
                    actual={avgDailyIn}
                    bands={[100, 500, 1000, 2000, 3000, 4000, 5000]}
                    ticks={[100, 500, 1000, 2000, 3000, 4000, 5000]}
                    tickValueFormatter={({ value }: BandFillColorAccessorInput) => String(value)}
                    bandFillColor={({ value }: BandFillColorAccessorInput) => {
                        return "green"
                    }}
                    labelMajor="Daily average Transaction in"
                    labelMinor="KES"
                    centralMajor={avgDailyIn.toString()}
                    centralMinor=""
                />
            </Chart>
            <Chart size={{ height: 400, width: 400 }}>
                <Goal
                    id="spec_1"
                    subtype={GoalSubtype.Goal}
                    base={200}
                    target={3000}
                    actual={avgDailyOut}
                    bands={[100, 500, 1000, 2000, 3000, 4000, 5000]}
                    ticks={[100, 500, 1000, 2000, 3000, 4000, 5000]}
                    tickValueFormatter={({ value }: BandFillColorAccessorInput) => String(value)}
                    // bandFillColor={({ value }: BandFillColorAccessorInput) => {
                    //     return "green"
                    // }}
                    labelMajor="Daily average Transaction out"
                    labelMinor="KES"
                    centralMajor={avgDailyOut.toString()}
                    centralMinor=""
                />
            </Chart>
            </Grid>
        )
    }

    return (
        <div>
            <div>
                <div>
                    {/* <p>Daily average transaction volume</p>
                    {transactionDetails?.aggregations?.average_transactions_amount_per_day_last_3_months.value} */}
                    <Range />
                    <p>Range is a benchmark between worst known and best known statements</p>

                </div>

            </div>

            {/* <div>

                <p>Total number of different transaction sources</p>
            </div> */}


            <Graph />
            <h3>Day incomming and outgoing transactions summary</h3>
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
                {user?.transactionDetails?.aggregations?.name?.buckets.map((item) => {
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


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}