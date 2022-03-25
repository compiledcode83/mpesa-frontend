import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
// import { FilePicker } from "../../components/Uploader/fileUploader";
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Check, Delete } from 'baseui/icon';
// import { folderHasItems, sendToS3 } from "../../helpers/s3";
// import { gql, useMutation } from "@apollo/client";
import { FilePicker } from '../components/Uploader/fileUploader';
import { folderHasItems, sendToS3 } from '../helpers/s3';
import { Input } from "baseui/input";

// /* eslint-disable */
// const CREATE_UPLOAD_BUTTON = gql`
// mutation ($input:CreateBadgeInput!) {
//   createBadge(input: $input) {
//     type
//   }
// }
// `;

const SellerDocs = () => {
    // const { search } = useLocation();
    const [css] = useStyletron();
    // const params = new URLSearchParams(search);
    // const account = params.get('account')
    // const userId = params.get('userId')
    // const taxId = params.get('taxId')  
    const [value, setValue] = React.useState("Hello");
    const [refresh, setRefresh] = useState(false)

    const fileSelected = async (files, item) => {
        const folder = `${account}/${item.filePath}`
        await sendToS3(files, folder)
        // upload done
    }

    const done = () => {
        setRefresh(true)
    }

    const Items = () => {
        return documents.map((item) => {
            return
        })
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Free mpesa anayzer</h2>
            {/* inspiration from https://www.mpesanalyser.com/ */}
            <div>

                <h2>
                    Till & Paybill reviews, Loan Appraisal
                </h2>
                <p>
                    Get Mpesa transactions details and breakdown for reconciliation and loan appraisal.
                </p>

                <h2>
                    Intelligent Analysis & Reporting
                </h2>
                <p>
                    Get Mpesa statement breakdown into categories such as Elect. Tokens, Data & Airtime.
                </p>

                <h2>Save Time</h2>
                <p>
                    Convert many mpesa statement at once using our tool hence saving on time.
                </p>
            </div>
            <ul
                className={css({
                    // width: '375px',
                    paddingLeft: 0,
                    paddingRight: 0,
                })}
            >
                <div style={{ marginBottom: 30 }}>
                    <ListItem
                    // endEnhancer={() => {
                    //     <div>
                    //         <Button
                    //             onClick={() => window.open(item.downloadURL)}
                    //         >
                    //             Download

                    //         </Button>

                    //     </div>



                    //     return <Button
                    //         shape="round"
                    //         size="default"
                    //         kind="secondary"
                    //     >
                    //         <Delete color="red" size={25} />
                    //     </Button>
                    // }}
                    >
                        <ListItemLabel description='Upload your mpesa statement to get instant feedback' >{'Get mpesa analytics back'}</ListItemLabel>

                    </ListItem>

                    <FilePicker fileSelected={(files) => fileSelected(files, item)} done={done} />

                </div>
                <div style={{ marginTop: 20 }}>
                    <Input
                        value={value}
                        type="password"
                        onChange={e => setValue(e.target.value)}
                        placeholder="Document password"
                        clearOnEscape
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <Button onClick={() => alert("click")}>Get excel file</Button>

                </div>
            </ul>


        </div>


    );
}

export default SellerDocs