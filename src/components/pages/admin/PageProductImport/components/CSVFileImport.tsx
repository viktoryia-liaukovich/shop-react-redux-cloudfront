import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { getImportToken } from "~/utils/utils";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    if (!file) {
      console.error("No file selected");
      return;
    }

    // Get the presigned URL
    const response = await axios({
      method: "GET",
      url,
      params: {
        fileName: encodeURIComponent(file.name),
      },
      headers: {
        Authorization: `Basic ${getImportToken()}`,
      },
    });

    if (!response.data.signedUrl) {
      console.error("No signed URL returned");
      return;
    }

    const result = await fetch(response.data.signedUrl, {
      method: "PUT",
      body: file,
    });
    console.log("Result: ", result);
    setFile(undefined);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
