import { Button, Paper, styled } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import DataGrid from "./components/DataGrid/DataGrid";
import "./App.css";

const Input = styled("input")({
  display: "none",
});

function App() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const fileReader = new FileReader();
  const [fileArray, setFileArray] = useState([]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleOnSubmit = (e) => {
    fileInputRef.current.click();
  };

  const parsedCsvFileToArray = (string) => {
    const rows = string.split("\n");
    setFileArray(rows);
  };
  useMemo(() => {
    if (file) {
      fileReader.onload = function (event) {
        const output = event.target.result;
        parsedCsvFileToArray(output);
      };
      fileReader.readAsText(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return (
    <div className="App">
      <h2>Pair employees who have worked together</h2>
      <Paper component={"form"} className="form">
        <Input
          type={"file"}
          accept={".csv"}
          ref={fileInputRef}
          onChange={handleChange}
        />
        <Button variant="contained" component="span" onClick={handleOnSubmit}>
          Upload csv file
        </Button>
      </Paper>
      <DataGrid data={fileArray} />
    </div>
  );
}

export default App;
