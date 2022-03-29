import React, { useEffect, useState } from 'react';
// import { useLocation } from "react-router-dom";
import { ListItem, ListItemLabel } from 'baseui/list';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
// import { Check, Delete } from 'baseui/icon';
import { FilePicker } from '../components/Uploader/fileUploader';
import { folderHasItems, sendToS3 } from '../helpers/s3';
import { Input } from "baseui/input";
import { Check } from "baseui/icon";
import { Card, StyledBody } from 'baseui/card';
import { sendFileToBackend } from '../helpers/sendFileToBackend';
import { saveAs } from 'file-saver';

const SellerDocs = () => {
    const [css] = useStyletron();

    const [refresh, setRefresh] = useState(false)
    const [fileList, setFileList] = useState([])

    const fileSelected = async (files, item) => {
        try {
            // const file = await sendToS3(files)
            const file = await sendFileToBackend(files)
            // console.log('file: afterup', file)
            setFileList([...fileList, ...file])
        } catch (err) {
            throw new Error(err)
        }
    }

    const done = () => {
        setRefresh(true)
    }


    const downloadExcelFile = async (file, password, setDownload) => {
        try {
            setDownload(true)
            console.log('start')
            const url = `http://localhost:8001/file/download/${file}.xlsx?password=${password}`
            const start = await fetch(url, { method: 'GET' })
            const fileBlob = await start.blob()
            await saveAs(fileBlob, 'file.xlsx');
            console.log('stop')
            setDownload(false)
        } catch (err) { throw new Error('password incorrect') }

    }

    const buttonDisabled = (password) => {
        if (password.length > 8) return false
        return true
    }

    const UploadFiles = () => {
        return fileList.map((file) => {
            const [password, setPassword] = useState('');
            const [download, setDownload] = useState(false)
            console.log('file:list', file)
            return (
                <div key={file.filename} style={{ marginTop: 50 }}>
                    <Card overrides={{ Root: { style: {} } }}>
                        <StyledBody>
                            <div>
                                FileName = {file.originalname}
                            </div>
                            <div style={{ marginTop: 20, width: 250 }}>
                                <Input
                                    value={password}
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Mpesa Document password"
                                    clearOnEscape
                                />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <Button onClick={() => downloadExcelFile(file.filename, password, setDownload)} isLoading={download} disabled={buttonDisabled(password)}>Get Excel File</Button>
                            </div>

                        </StyledBody>
                    </Card>
                </div>
            )
        })

    }


    const UploadFile = () => {
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


                {/* <div style={{ marginTop: 20 }}>
                    <Button onClick={() => alert("click")}>Get results</Button>

                </div>

                <div style={{ marginTop: 20 }}>
                    <Button onClick={() => alert("click")}>Download Excel file</Button>
                </div> */}
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


            <UploadFile />

            <UploadFiles />
        </div>


    );
}

export default SellerDocs