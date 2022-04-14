import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { FilePicker } from '../components/Uploader/fileUploader';
import { Input } from "baseui/input";
import { Card, StyledBody } from 'baseui/card';
import { sendFileToBackend } from '../helpers/sendFileToBackend';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faFileContract, faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import {
    SnackbarProvider,
    useSnackbar,
} from 'baseui/snackbar';
import { Delete } from 'baseui/icon';

const SellerDocs = () => {
    const [css] = useStyletron();
    const [fileList, setFileList] = useState<any[]>([])
    const { enqueue } = useSnackbar();

    const fileSelected = async (files: any) => {
        try {
            const file = await sendFileToBackend(files)
            setFileList([...fileList, ...file])
        } catch (err) {
            throw new Error(err)
        }
    }

    const processDoc = async (file: any, password: string, setDownload: any, userDetails) => {
        try {
            setDownload(true)
            const url = `${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/processDoc/${file}?password=${password}`
            // console.log('url:', url)
            const start = await fetch(url, {
                method: 'GET',
                // mode: "no-cors", // 'cors' by default
                headers: {
                    'Access-Control-Allow-Origin': 'https://www.sevi.io',
                    'Access-Control-Allow-Credentials': 'true'
                }
            })
            console.log('start:', start)
            if (start.statusText === 'Unauthorized') {
                enqueue({
                    message: 'Looks like the password is incorrect',
                    startEnhancer: ({ size }) => <Delete size={size} />,
                })
            }

            const val = await start.json()
            userDetails(val)
            setDownload(false)
        } catch (err) { throw new Error('password incorrect') }
    }

    const downloadExcel = async (userDetails) => {
        const url = `${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/toExcel/${userDetails.userId}`
        console.log('url:', url)

        const start = await fetch(url, {
            method: 'GET',
            // mode: "no-cors", // 'cors' by default
            headers: {
                'Access-Control-Allow-Origin': 'https://www.sevi.io',
                'Access-Control-Allow-Credentials': 'true'
            }
        })
        const fileBlob = await start.blob()
        await saveAs(fileBlob, `${userDetails.name.replaceAll(" ", "-")}.xlsx`);
    }

    const buttonDisabled = (password: string) => {
        if (password.length > 7) return false
        return true
    }

    const UploadFiles = () => {
        return fileList.map((file) => {
            const [password, setPassword] = useState('');
            const [download, setDownload] = useState(false)
            const [userDetails, setUserDetails] = useState({ userId: null, name: null, phoneNumber: null })

            if (userDetails.userId) {
                return (
                    <div key={file.filename} style={{ marginTop: 50 }}>
                        <Card overrides={{ Root: { style: {} } }}>
                            {/* <StyledBody> */}
                            <div>
                                <h3>{userDetails.name}</h3>
                                <h3>{userDetails.phoneNumber}</h3>
                                <div style={{ marginTop: 20 }}>
                                    <Button>
                                        <Link href={`/stats/${userDetails.userId}`}>
                                            <a style={{ color: 'white' }}>Show general stats</a>
                                        </Link>
                                    </Button>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <Button onClick={() => downloadExcel(userDetails)} >download excel file</Button>
                                </div>
                            </div>
                            {/* </StyledBody> */}
                        </Card>
                    </div >
                )
            }

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
                                    onChange={(e): any => {
                                        const text: any = e.target as Element
                                        setPassword(text.value)
                                    }
                                    }
                                    placeholder="Mpesa Document password"
                                    clearOnEscape
                                />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <Button onClick={() => processDoc(file.filename, password, setDownload, setUserDetails)} isLoading={download} disabled={buttonDisabled(password)}>Analyze file</Button>
                            </div>
                        </StyledBody>
                    </Card>
                </div >
            )
        }) as any

    }

    const PitchText = ({ title, description, icon, fontSize = 16, color = 'white', spacing = 0 }: { title: string, description: string, icon?: IconDefinition, fontSize?: number, color?: string, spacing?: number }) => (
        <>
            {icon ?
                <div style={{ width: 40, float: 'left', marginRight: 10, padding: 5, textAlign: 'center' }}>
                    <FontAwesomeIcon icon={icon} color="white" size="2x" />
                </div>
                : null}

            <div style={{ float: 'left' }}>
                <h3 style={{ color: color, marginBottom: 0, fontSize: fontSize, marginTop: 0 }}>
                    {title}
                </h3>

                <p style={{ color: color === 'white' ? color : undefined, marginTop: spacing }}>
                    {description}
                </p>
            </div>

            <div style={{ clear: 'both' }}></div>
        </>
    );

    const UploadFile = () => {
        return (
            <StyledBody
                className={css({
                    // width: '375px',
                    paddingLeft: 0,
                    paddingRight: 0,
                })}
            >
                <div style={{ marginBottom: 30 }}>
                    <PitchText title="Get valuable insight into mpesa transactions" description="Upload your mpesa statement to get instant feedback" fontSize={20} color='#1c2973' spacing={10} />

                    <div style={{ paddingTop: 10 }}>
                        <FilePicker fileSelected={(files): any => fileSelected(files)} />
                    </div>
                </div>

            </StyledBody>

        )
    };

    return (

        <div style={{ maxWidth: 1024, margin: 'auto', padding: 20 }}>

            <h1 style={{ color: '#1c2973' }}>Free Mpesa statement analyzer</h1>

            {/* inspiration from https://www.mpesanalyser.com/ */}
            <div style={{ backgroundColor: '#1c2973', paddingLeft: 20, paddingTop: 20, paddingBottom: 15, borderRadius: 10, marginBottom: 30 }}>
                <PitchText icon={faCoins} title="Till & Paybill reviews, Loan Appraisal" description="Get Mpesa transactions details and breakdown for reconciliation and loan appraisal." />
                <PitchText icon={faFileContract} title="Intelligent Analysis & Reporting" description="Get Mpesa statement breakdown into categories such as Elect. Tokens, Data & Airtime." />
                <PitchText icon={faClock} title="Save Time" description="Convert many mpesa statement at once using our tool hence saving on time." />
            </div>

            <div> <UploadFile /></div>


            <div> <UploadFiles /></div>

        </div>


    );
}

export default function Base() {
    return (
        <SnackbarProvider>
            <SellerDocs />
        </SnackbarProvider>
    )
}
//  export default 