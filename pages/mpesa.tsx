import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Check, Delete } from 'baseui/icon';
import { FilePicker } from '../components/Uploader/fileUploader';
import { folderHasItems, sendToS3 } from '../helpers/s3';
import { Input } from "baseui/input";

const SellerDocs = () => {
    const [css] = useStyletron();
    const [password, setPassword] = useState('');
    const [refresh, setRefresh] = useState(false)

    const fileSelected = async (files, item) => {
        console.log('files:', files)
        // const folder = `${account}/${item.filePath}`
        await sendToS3(files)
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


    const UploadFile = () => {
        if (password.length === '')
            return (
                <div
                    className={css({
                        // width: '375px',
                        paddingLeft: 0,
                        paddingRight: 0,
                    })}
                >
                    <div style={{ marginBottom: 30 }}>
                        <ListItem>
                            <ListItemLabel description='Upload your mpesa statement to get instant feedback' >{'Get mpesa analytics back'}</ListItemLabel>
                        </ListItem>
                        <FilePicker fileSelected={(files) => fileSelected(files)} done={done} />

                    </div>


                    <div style={{ marginTop: 20 }}>
                        <Button onClick={() => alert("click")}>Get results</Button>

                    </div>
                </div>

            )
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Free mpesa statement anayzer</h2>

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
            <div style={{ marginTop: 50 }}>
                <Input
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mpesa Document password"
                    clearOnEscape
                />
            </div>

            <UploadFile />
        </div>


    );
}

export default SellerDocs