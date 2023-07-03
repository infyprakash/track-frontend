import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosObj from "../../Shared/AxiosInstance";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Pie } from "react-chartjs-2";
import { Doughnut, Bar } from "react-chartjs-2";
import Chip from "@mui/material/Chip";
import "chart.js/auto";

import OrderDetail from "./OrderDetail";

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard({ orderStatus }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showDashboard, setShowDashboard] = React.useState(true);
  const [showOrderDetail, setShowOrderDetail] = React.useState(false);

  const { OrderId } = useParams();

  const handleDashboard = () => {
    setShowDashboard(true);
    setShowOrderDetail(false);
  };

  const handleOrderDetail = () => {
    setShowDashboard(false);
    setShowOrderDetail(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Dashboard"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleDashboard()}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"Order Detail"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleOrderDetail()}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Order Detail"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {showDashboard && <DashboardHome />}
        {showOrderDetail && <OrderDetail />}
      </Box>
    </Box>
  );
}

function DashboardHome({ orderId }) {
  const { OrderId } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);

  const getCurrentStage = (data) => {
    var currentStage;

    switch (data?.OrderStage[data?.OrderStage.length - 1].stage) {
      case 0:
        currentStage = "Processing";
        break;
      case 1:
        currentStage = "Weaving";
        break;
      case 2:
        currentStage = "Trimming";
        break;
      case 3:
        currentStage = "Washing";
        break;
      case 4:
        currentStage = "Finalized";
        break;
    }
    return currentStage;
  };

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

  return (
    <div>
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
      <Box sx={{ flexGrow: 1 }} marginTop={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {/* <Item> */}
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "red",
                color: "white",
              }}
            >
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  Order Created Date
                </Typography>
                <Typography align="center" variant="h5" gutterBottom>
                  <Chip
                    label={new Date(orderStatus?.CreatedAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "2-digit",
                      }
                    )}
                    sx={{ color: "white", fontWeight: "bold" }}
                    variant="outlined"
                  />
                </Typography>
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <Item> */}
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "orange",
                color: "white",
              }}
            >
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  Expected Delivery Date
                </Typography>
                <Typography align="center" variant="h5" gutterBottom>
                  <Chip
                    label={new Date(
                      orderStatus?.ExpectedDeliveryDate
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "2-digit",
                    })}
                    sx={{ color: "white", fontWeight: "bold" }}
                    variant="outlined"
                  />
                </Typography>
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <Item> */}
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "green",
                color: "white",
              }}
            >
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  Required Number of Days
                </Typography>
                <Typography align="center" variant="h5" gutterBottom>
                  <Chip
                    label={orderStatus?.OrderStatusEstimate.TotalDaysRequired}
                    sx={{ color: "white", fontWeight: "bold" }}
                    variant="outlined"
                  />
                </Typography>
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <Item> */}
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "purple",
                color: "white",
              }}
            >
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  Current Stage
                </Typography>
                <Typography align="center" variant="h5" gutterBottom>
                  {orderStatus &&
                    orderStatus.OrderStage &&
                    orderStatus.OrderStage.length > 0 && (
                      <Chip
                        label={getCurrentStage(orderStatus)}
                        variant="outlined"
                        sx={{ color: "white", fontWeight: "bold" }}
                      />
                    )}
                </Typography>
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }} marginTop={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            {/* <Item> */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  <Chip
                    label="order completed by days"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>

                {orderStatus &&
                  orderStatus.OrderStatusEstimate &&
                  orderStatus.OrderStage.length > 0 && (
                    <DaysProgressBar statusData={orderStatus} />
                  )}
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            {" "}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  <Chip
                    label="order completed by stage"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>

                {orderStatus &&
                  orderStatus.OrderStatusEstimate &&
                  orderStatus.OrderStage.length > 0 && (
                    <StageProgressBar statusData={orderStatus} />
                  )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }} marginTop={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            {/* <Item> */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  <Chip
                    label={
                      "Required Number of Days for priority: " +
                      (orderStatus?.OrderStatusEstimate.PriorityName || "")
                    }
                    sx={{ fontWeight: "bold" }}
                    color="primary"
                    variant="outlined"
                  />
                </Typography>

                {orderStatus && orderStatus.OrderStatusEstimate && (
                  <DaysPieChart statusData={orderStatus.OrderStatusEstimate} />
                )}
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {/* <Item> */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  <Chip
                    label="Remaining Days"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>

                {orderStatus &&
                  orderStatus.OrderStatusEstimate &&
                  orderStatus.OrderStage.length > 0 && (
                    <RemainingPieChart statusData={orderStatus} />
                  )}
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }} marginTop={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            {/* <Item> */}
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography align="center" variant="h6" gutterBottom>
                  <Chip
                    label="Days Required versus Days Spent"
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </Typography>

                {orderStatus &&
                  orderStatus.OrderStatusEstimate &&
                  orderStatus.OrderStage.length > 0 && (
                    <DaysBarChart statusData={orderStatus} />
                  )}
              </CardContent>
            </Card>
            {/* </Item> */}
          </Grid>
          <Grid item xs={12} sm={12} md={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

function StageProgressBar({ statusData }) {
  var stage = 0;
  var totalStage = 5;
  for (let i = 0; i < statusData.OrderStage.length; i++) {
    if (statusData.OrderStage[i].isCompleted) stage += 1;
  }
  console.log(stage);
  const progress = (stage / totalStage) * 100;

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="primary"
        sx={{ width: "100%", height: 20, borderRadius: 10 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function DaysProgressBar({ statusData }) {
  var daysSpent = 0;
  var totalDays = statusData.OrderStatusEstimate.TotalDaysRequired;
  for (let i = 0; i < statusData.OrderStage.length; i++) {
    daysSpent += statusData.OrderStage[i].daysSpent;
  }
  const progress = (daysSpent / totalDays) * 100;

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="primary"
        sx={{ width: "100%", height: 20, borderRadius: 10 }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function RemainingPieChart({ statusData }) {
  var daysSpent = 0;
  var totalDays = statusData.OrderStatusEstimate.TotalDaysRequired;
  for (let i = 0; i < statusData.OrderStage.length; i++) {
    daysSpent += statusData.OrderStage[i].daysSpent;
  }
  const data = {
    labels: ["Total Days Spent", "Remaining Days"],
    datasets: [
      {
        data: [daysSpent, totalDays - daysSpent],
        backgroundColor: ["#FF5722", "#FF9800"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={chartOptions} width={350} height={350} />
    </div>
  );
  // const chartData = {
  //   labels: ["Days Spent", "Remaining Days"],
  //   datasets: [
  //     {
  //       data: [daysSpent, totalDays - daysSpent],
  //       backgroundColor: ["green", "lightgray"],
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   // maintainAspectRatio: false,
  // };

  return <div>{/* <Doughnut data={chartData} options={options} /> */}</div>;
}

function DaysBarChart({ statusData }) {
  var data = [];
  data.push(statusData?.OrderStatusEstimate.TotalDaysRequired);
  var backgroundColors = [];
  var borderColors = [];
  backgroundColors.push("violet");
  borderColors.push("violet");
  for (let i = 0; i < statusData.OrderStage.length > 0; i++) {
    if (i === 0) {
      data.push(statusData?.OrderStatusEstimate.DaysRequiredForProcessing);
      let daysSpent = statusData?.OrderStage[i].daysSpent;
      data.push(daysSpent);

      backgroundColors.push("yellow");
      borderColors.push("yellow");
      if (
        daysSpent > statusData?.OrderStatusEstimate.DaysRequiredForProcessing
      ) {
        backgroundColors.push("red");
        borderColors.push("red");
      } else {
        backgroundColors.push("green");
        borderColors.push("green");
      }
    } else if (i === 1) {
      data.push(statusData?.OrderStatusEstimate.DaysReqiredForWeaving);
      let daysSpent = statusData?.OrderStage[i].daysSpent;
      data.push(daysSpent);

      backgroundColors.push("blue");
      borderColors.push("blue");
      if (daysSpent > statusData?.OrderStatusEstimate.DaysReqiredForWeaving) {
        backgroundColors.push("red");
        borderColors.push("red");
      } else {
        backgroundColors.push("green");
        borderColors.push("green");
      }
    } else if (i === 2) {
      let total = statusData?.OrderStatusEstimate.DaysRequiredForTrimming;
      data.push(total);
      let totalSpent = statusData?.OrderStage[i].daysSpent;
      data.push(totalSpent);

      backgroundColors.push("orange");
      borderColors.push("orange");
      if (totalSpent > total) {
        backgroundColors.push("red");
        borderColors.push("red");
      } else {
        backgroundColors.push("green");
        borderColors.push("green");
      }
    } else if (i === 3) {
      let total = statusData?.OrderStatusEstimate.DaysRequiredForWashing;
      data.push(total);
      let totalSpent = statusData?.OrderStage[i].daysSpent;
      data.push(totalSpent);

      backgroundColors.push("purple");
      borderColors.push("purple");
      if (totalSpent > total) {
        backgroundColors.push("red");
        borderColors.push("red");
      } else {
        backgroundColors.push("green");
        borderColors.push("green");
      }
    } else if (i >= 4) {
      var total = 0;
      if (i === 4)
        total += statusData?.OrderStatusEstimate.DaysRequiredForFinalTriming;
      if (i === 5)
        total += statusData?.OrderStatusEstimate.DaysRequiredForFinishing;
      if (i === 6)
        total += statusData?.OrderStatusEstimate.DaysRequiredForPackaging;
      if (i === 7)
        total += statusData?.OrderStatusEstimate.DaysRequiredForShipping;
      data.push(total);
      let totalSpent = statusData?.OrderStage[i].daysSpent;
      data.push(totalSpent);

      backgroundColors.push("pink");
      borderColors.push("pink");
      if (totalSpent > total) {
        backgroundColors.push("red");
        borderColors.push("red");
      } else {
        backgroundColors.push("green");
        borderColors.push("green");
      }
    }
  }

  const chartData = {
    labels: [
      "Total Days",
      "Days Required for Processing",
      "Days Spent for Processing",
      "Days Required for Weaving",
      "Days Spent for Weaving",
      "Days Required for Trimming",
      "Days Spent for Trimming",
      "Days Required for Washing",
      "Days Spent for Washing",
      "Days Required for Finalized",
      "Days Spent for Finalized",
    ],
    datasets: [
      {
        axis: "y",
        fill: false,
        borderWidth: 1,
        label: "Days",
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

function DaysPieChart({ statusData }) {
  const data = {
    labels: [
      "Processing",
      "Trimming",
      "Washing",
      "Final Trimming",
      "Finishing",
      "Packaging",
      "Shipping",
      "Weaving",
    ],
    datasets: [
      {
        data: [
          statusData?.DaysRequiredForProcessing,
          statusData?.DaysRequiredForTrimming,
          statusData?.DaysRequiredForWashing,
          statusData?.DaysRequiredForFinalTriming,
          statusData?.DaysRequiredForFinishing,
          statusData?.DaysRequiredForPackaging,
          statusData?.DaysRequiredForShipping,
          statusData?.DaysReqiredForWeaving,
        ],
        backgroundColor: [
          "#FF5722",
          "#FF9800",
          "#FFC107",
          "#FFEB3B",
          "#CDDC39",
          "#8BC34A",
          "#4CAF50",
          "#009688",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "end",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={chartOptions} width={350} height={350} />
    </div>
  );
}
