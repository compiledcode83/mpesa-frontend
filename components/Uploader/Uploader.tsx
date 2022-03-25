import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { styled } from "baseui";
import { UploadIcon } from "assets/icons/UploadIcon";
import { useMutation, gql } from "@apollo/client";
import Url from "url-parse";
import axios from "axios";
import Img_Spinner from "assets/image/spinner.gif";

const Text = styled("span", ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  marginTop: "15px",
  textAlign: "center",
}));

const TextHighlighted = styled("span", ({ $theme }) => ({
  color: $theme.colors.primary,
  fontWeight: "bold",
}));

const Container = styled("div", ({ props }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#E6E6E6",
  borderStyle: "dashed",
  backgroundColor: "#ffffff",
  color: "#bdbdbd",
  outline: "none",
  transition: "border 0.24s ease-in-out",
  cursor: "pointer",
}));

const ThumbsContainer = styled("aside", () => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: "16px",
}));

const Thumb = styled("div", ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: "inline-flex",
  borderRadius: "2px",
  marginBottom: "8px",
  marginRight: "8px",
  width: "100px",
  height: "100px",
  padding: "4px",
  boxSizing: "border-box",
}));

const Spinner = styled("div", () => ({
  display: "flex",
  width: "100%",
  backgroundPosition: "center",
  backgroundImage: `url(${Img_Spinner})`,
  backgroundSize: "150%",
}));

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  justifyContent: "center",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
const CREATE_PRESIGNED_POST = gql`
  mutation($type: UploadTypeEnum!) {
    createPreSignedPost(type: $type) {
      data
      key
      url
    }
  }
`;

function Uploader({ onChange, imageURL = [] }: any) {
  // const currentWallet = useWalletState("currentWallet");
  const [files, setFiles] = useState(
    imageURL.map((url) => ({ name: "demo", preview: url.url, loading: false }))
  );
  const [getURL] = useMutation(CREATE_PRESIGNED_POST);

  async function startUpload(file: File, presignedUrl: string, key: string) {
    const send = await axios({
      method: "PUT",
      url: presignedUrl,
      data: file,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (send.status === 200) return "good";
    else return "bad";
  }
  const uploadFile = async (file) => {
    const presignedUrl = await getURL({
      variables: {
        type: "PRODUCT",
        // account: currentWallet,
        imageName: file.name,
        imageType: file.type,
      },
    });

    const sendNow = await startUpload(
      file,
      presignedUrl.data.createPreSignedPost.url,
      presignedUrl.data.createPreSignedPost.key
    );


    if (sendNow !== "good") return false;
    var url = new Url(presignedUrl.data.createPreSignedPost.url);
    return `${url.origin}${url.pathname}`;
  };
  const handleAcceptedfiles = async (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) => ({
        name: file.name,
        preview: "",
        loading: true,
      }))
    );
    type FileObject = {
      name: string;
      preview: string;
      loading: boolean;
    };
    const uploaded_files: Array<FileObject> = await Promise.all(
      acceptedFiles.map(async (file) => {
        const fileUrl = await uploadFile(file);
        return { name: file.name, preview: fileUrl, loading: false };
      })
    );
    setFiles(uploaded_files);
    onChange(uploaded_files);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => handleAcceptedfiles(acceptedFiles),
  });

  const thumbs = files.map((file, key) => (
    <Thumb key={key}>
      {file.loading ? (
        <Spinner />
      ) : (
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt={file.name} />
        </div>
      )}
    </Thumb>
  ));

  return (
    <section className="container uploader">
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon />
        <Text>
          <TextHighlighted>Drag/Upload</TextHighlighted> your image here.
        </Text>
      </Container>
      {thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}
    </section>
  );
}

export default Uploader;
