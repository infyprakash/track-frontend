import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosObj from "../Shared/AxiosInstance";
import { styled, useTheme } from "@mui/material/styles";

import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Admin() {
  const [orderId, setOrderId] = useState(null);
  const [orderObj, setOrderObj] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [selectManufacturer, setSelectManufacturer] = useState(null);

  //   const [selectOrder, setSelectedOrder] = useState(null);
  //   const [checked, setChecked] = React.useState(true);

  const handleManufacturerChange = (event) => {
    event.preventDefault();
    setSelectManufacturer(event.target.value);
    // setOrderId(event.target.name);
    // if (event.target.name) {
    //   axiosObj
    //     .get("/OrderSheet/byId", { params: { orderId: event.target.name } })
    //     .then((response) => {
    //       console.log(response.data);
    //       setSelectedOrder(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };

  useEffect(() => {
    axiosObj
      .get("/Manufacturer/all")
      .then((response) => {
        setManufacturer(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosObj
      .get("/OrderSheet")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosObj
      .get("/OrderSheet/all")
      .then((response) => {
        console.log(response.data);
        setOrderObj(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {" "}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administration
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }} marginTop={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            {" "}
            <Card>
              <CardContent sx={{ overflow: "auto", height: "500px" }}>
                <Table aria-label="simple table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Dimension</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderObj &&
                      orderObj.length > 0 &&
                      orderObj.map((item, index) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {/* <TableCell>
                            <Checkbox
                              checked={orderId === item.orderId}
                              onChange={handleChange}
                              inputProps={{ "aria-label": "controlled" }}
                              name={item.orderId}
                            />
                          </TableCell> */}
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "2-digit",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            {item.physicalWidth} X {item.physicalHeight}{" "}
                            {item.unit}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Manufacturer
                              </InputLabel>
                              <Select
                                value={selectManufacturer}
                                onChange={(event) =>
                                  handleManufacturerChange(
                                    event,
                                    manufacturer.id
                                  )
                                }
                              >
                                {manufacturer &&
                                  manufacturer.length > 0 &&
                                  manufacturer.map((manu) => (
                                    <MenuItem key={manu.id} value={manu.id}>
                                      {manu.companyName}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={12}></Grid>
          <Grid item xs={12} sm={6} md={12}></Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Admin;
