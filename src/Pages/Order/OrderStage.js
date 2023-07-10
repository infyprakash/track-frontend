import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosObj from "../../Shared/AxiosInstance";

import {
  Checkbox,
  TextField,
  MenuItem,
  Button,
  Alert,
  Chip,
  FormControlLabel,
  Divider,
} from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import { AppBar, Toolbar, Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

function OrderStage() {
  const { OrderId } = useParams();
  const orderStages = [
    "Processing",
    "Weaving",
    "Trimming",
    "Washing",
    "Finalized",
  ];
  const [currentStage, setCurrentStage] = useState(4);
  const [orderStageObj, setOrderStageObj] = useState([]);

  const [fileInput, setFileInput] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const [formValues, setFormValues] = useState({
    stage: "",
    OrderSheetId: "",
    lengthCompleted: 0,
    lengthUnit: "",
    image: "",
    isCompleted: "",
  });

  const [snackbarState, setsnackbarState] = useState({
    open: false,
    severity: "success",
    message: "Order Stage updated Successfully",
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      setFileInput(event.target.files[0]);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("stage", currentStage);
    formData.append("OrderSheetId", OrderId);
    formData.append("lengthCompleted", formValues.lengthCompleted);
    formData.append("lengthUnit", formValues.lengthUnit);
    formData.append("image", fileInput);
    formData.append("isCompleted", isChecked);
    try {
      const response = await axiosObj.post("/OrderStage/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setsnackbarState({
        open: true,
        severity: "success",
        message: "Order Stage updated Successfully",
      });
      setFormValues({
        stage: "",
        OrderSheetId: "",
        lengthCompleted: 0,
        lengthUnit: "",
        isCompleted: "",
      });
      setFileInput(null);
    } catch (error) {
      setsnackbarState({
        open: true,
        severity: "",
        message: error,
      });
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setsnackbarState({ open: false });
    // setOpen(false);
  };

  const getLengthUnit = (val) => {
    switch (val) {
      case 0:
        return "Meter(m)";
      case 1:
        return "Centimeter(cm)";
      case 2:
        return "feet(ft)";
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosObj.get("/OrderStage/orderId", {
          params: { id: OrderId },
        });
        setOrderStageObj(response.data);
        var res = response.data;
        for (let i = 0; i < orderStages?.length; i++) {
          //   var lastItem = res[i][res[i].length - 1];
          if (res[i] === undefined) {
            setCurrentStage(i);
            break;
          }
          if (res[i][res[i]?.length - 1].isCompleted === false) {
            setCurrentStage(i);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [OrderId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {" "}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" align="center">
              Currently Processing{" "}
              <Chip
                label={orderStages[currentStage]}
                variant="outlined"
                sx={{ fontWeight: "bold", color: "green", fontSize: "20px" }}
              />{" "}
              stage
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Updated Image for this stage"
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: <CloudUploadIcon />,
                    }}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {currentStage != "" && currentStage == 1 && (
                    <TextField
                      required
                      label="Length Completed"
                      type="number"
                      name="lengthCompleted"
                      value={formValues.lengthCompleted}
                      fullWidth
                      onChange={handleInputChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {currentStage != "" && currentStage == 1 && (
                    <TextField
                      required
                      label="Length Unit"
                      name="lengthUnit"
                      value={formValues.lengthUnit}
                      onChange={handleInputChange}
                      fullWidth
                      select
                    >
                      <MenuItem value={0}>Meter</MenuItem>
                      <MenuItem value={1}>Centimeter</MenuItem>
                      <MenuItem value={2}>Feet</MenuItem>
                    </TextField>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        name="isCompleted"
                      />
                    }
                    label="Is This stage completed? "
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: 15 }}
                  >
                    Update {orderStages[currentStage]} Stage
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {orderStages &&
          orderStages.map((item, index) =>
            index <= currentStage ? (
              index === currentStage ? (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={index}
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    <Typography>
                      <HourglassTopIcon />
                      {item}
                    </Typography>
                  </AccordionSummary>
                  {orderStageObj.length > 0 && orderStageObj[index] && (
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={8}>
                          {" "}
                          <img
                            src={` http://192.168.101.4:8080/${
                              orderStageObj[index][
                                orderStageObj[index]?.length - 1
                              ].filePath
                            }`}
                            alt="Image"
                            style={{
                              width: "100%", // Set the width as needed
                              height: "auto", // Set the height as needed
                              objectFit: "cover", // Adjust the object-fit property as desired (e.g., 'contain', 'fill', etc.)
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          {index == 1 ? (
                            <Typography>
                              Length Completed:{" "}
                              {
                                orderStageObj[index][
                                  orderStageObj[index]?.length - 1
                                ].lengthCompleted
                              }{" "}
                              {getLengthUnit(
                                orderStageObj[index][
                                  orderStageObj[index].length - 1
                                ].lengthUnit
                              )}
                            </Typography>
                          ) : (
                            <Typography sx={{ fontWeight: "bold" }}>
                              Stage Name:
                              <Chip label={item} color="warning"></Chip>
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  )}
                </Accordion>
              ) : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={index}
                  >
                    <Typography sx={{ color: "green" }}>
                      {" "}
                      <CheckIcon />
                      {item}
                    </Typography>
                  </AccordionSummary>
                  {orderStageObj.length > 0 && (
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={6} md={8}>
                          {" "}
                          <img
                            src={` http://192.168.101.4:8080/${
                              orderStageObj[index][
                                orderStageObj[index].length - 1
                              ].filePath
                            }`}
                            alt="Image"
                            style={{
                              width: "100%", // Set the width as needed
                              height: "auto", // Set the height as needed
                              objectFit: "cover", // Adjust the object-fit property as desired (e.g., 'contain', 'fill', etc.)
                            }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                          {" "}
                          {index == 1 ? (
                            <div>
                              <Typography sx={{ fontWeight: "bold" }}>
                                Stage Name:
                                <Chip label={item} color="warning"></Chip>
                              </Typography>
                              <br></br>
                              <Divider />
                              <br></br>
                              <Typography>
                                Length Completed:{" "}
                                <Chip
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                  label={`${
                                    orderStageObj[index][
                                      orderStageObj[index].length - 1
                                    ].lengthCompleted
                                  } ${getLengthUnit(
                                    orderStageObj[index][
                                      orderStageObj[index].length - 1
                                    ].lengthUnit
                                  )}`}
                                />
                              </Typography>
                            </div>
                          ) : (
                            <Typography sx={{ fontWeight: "bold" }}>
                              Stage Name:
                              <Chip label={item} color="warning"></Chip>
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  )}
                </Accordion>
              )
            ) : (
              <Accordion disabled>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={index}
                >
                  <Typography sx={{ color: "red" }}>
                    <ClearIcon />
                    {item}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            )
          )}
      </Grid>
      <Stack>
        <Snackbar
          open={snackbarState.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          {snackbarState.severity === "success" ? (
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {snackbarState.message}
            </Alert>
          ) : (
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {snackbarState.message}
            </Alert>
          )}
        </Snackbar>
      </Stack>
    </Grid>
  );
}
export default OrderStage;
