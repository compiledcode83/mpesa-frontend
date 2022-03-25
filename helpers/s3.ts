import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";


const credentials = {
    // accessKeyId: 'AKIAYAMMCWGLDUJQ2MCX',
    // secretAccessKey: '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'
}

export const sendToS3 = (files, folder) => {
    console.log('folder:', folder)
    files.map(async (file) => {
        console.log('file:', file)
        const target = { Bucket: 'sevi-mpesa-statements', Key: `locked/${file.name}`, Body: file };
        try {
            const parallelUploads3 = new Upload({
                client: new S3({ region: "eu-central-1", credentials }) || new S3Client({
                    region: "eu-central-1",
                    credentials,
                }),
                // tags: [...], // optional tags
                // queueSize: 4, // optional concurrency configuration
                // partSize: '5MB', // optional size of each part
                leavePartsOnError: false, // optional manually handle dropped parts
                params: target,
            });

            parallelUploads3.on("httpUploadProgress", (progress) => {
                console.log(progress);
            });
            await parallelUploads3.done();
        } catch (e) {
            throw new Error(e)
        }
    })
}


export const folderHasItems = async (folder) => {
    const s3 = new S3({ region: "eu-central-1", credentials })
    const objects = await s3.listObjectsV2({ Bucket: 'sevi-mpesa-statements', Prefix: folder })
    console.log('objects:', objects)
    if (objects.KeyCount > 0) {
        return true
    }
    return false
}