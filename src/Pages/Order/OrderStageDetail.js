import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosObj from "../../Shared/AxiosInstance";

import { Chip, Divider } from "@mui/material";

import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

function OrderStageDetail() {
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
      <Grid item xs={12} sm={12} md={12}>
        {orderStages &&
          orderStages.map((item, index) =>
            index <= currentStage ? (
              index == currentStage ? (
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
    </Grid>
  );
}
export default OrderStageDetail;
