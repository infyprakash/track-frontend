import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosObj from "../../Shared/AxiosInstance";
import { styled, useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppBar, Toolbar, Typography } from "@mui/material";

const ImageCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "200px",
}));

function OrderDetail() {
  const { OrderId } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);
  useEffect(() => {
    axiosObj
      .get("/OrderStatus/detail/", { params: { orderId: OrderId } })
      .then((response) => {
        console.log(response.data);
        setOrderStatus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [OrderId]);
  console.log(orderStatus);
  return (
    <div>
      <Grid container spacing={2}>
        {/* First Column */}
        <Grid item xs={12} sm={6} md={8}>
          <ImageCard>
            {/* Replace 'imageURL' with your image source */}
            <img
              src={orderStatus?.ImageUrl}
              alt="Image"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </ImageCard>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={6} md={4}>
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" align="center">
                Order Id:{" "}
                <Chip
                  label={orderStatus?.OrderId}
                  variant="outlined"
                  sx={{ fontWeight: "bold" }}
                />
              </Typography>
            </Toolbar>
          </AppBar>
          <Card>
            <CardContent>
              <Box sx={{ width: "100%" }}>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>Design</TableCell>
                        <TableCell>
                          <Chip
                            label={orderStatus?.DesignName}
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dimension</TableCell>
                        <TableCell>
                          <Chip
                            label={`${orderStatus?.PhysicalWidth} X ${orderStatus?.PhysicalHeight} ${orderStatus?.Unit}`}
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default OrderDetail;
