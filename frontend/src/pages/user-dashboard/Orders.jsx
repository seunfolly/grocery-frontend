import {
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
  Paper,
  Chip,
  Avatar,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EastIcon from '@mui/icons-material/East';

const orders = [
    {
        id: Math.floor(Math.random() * 100000),
        order: "f0ba538b",
        status: "pending",
        date: "Nov 22, 2023",
        total: "$333"
    },
    {
        id: Math.floor(Math.random() * 100000),
        order: "f0ba538b",
        status: "pending",
        date: "Nov 22, 2023",
        total: "$333"
    }, {
        id: Math.floor(Math.random() * 100000),
        order: "f0ba538b",
        status: "pending",
        date: "Nov 22, 2023",
        total: "$333"
    }
]

const Order = ({id,order,status,date,total}) => {
    return (
        <Link to={`/user/orders/${id}`} style={{
            textDecoration: "none"
        }}>
        <Paper elevation={0} sx={{
            paddingX: 2,
            paddingY: 1.5,
            display: "flex",
            bgcolor: "white",
            borderRadius: "10px",
            alignItems: "center"
            }}> 
              <Typography variant="subtitle1" flex="1 1 0">
          {order}
        </Typography>
         <Box flex="1 1 0">
         <Chip label={status} sx={{
            height: "25px"
         }} />
         </Box>

        <Typography variant="subtitle2" flex="1 1 0" marginLeft="40px" sx={{
          marginLeft:"40px" 
        }}>
          {date}
        </Typography>
        <Typography variant="subtitle2" flex="1 1 0" marginLeft="40px">
          {total}
        </Typography>
            
        <Typography  >
            <IconButton >
                <EastIcon />
            </IconButton>
        </Typography>
            </Paper>
        </Link>
        
    )
}

const Orders = () => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <ShoppingBagIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            My Orders
          </Typography>
        </Stack>
      </Stack>

      <Box display="flex" px={2} color="#7d879c">
        <Typography variant="body2" flex="1 1 0">
          Order#
        </Typography>
        <Typography variant="body2" flex="1 1 0">
          Status
        </Typography>
        <Typography variant="body2" flex="1 1 0">
          Date Purchased
        </Typography>
        <Typography variant="body2" flex="1 1 0">
          Total
        </Typography>
      </Box>

      <Stack spacing={2}>
        {
            orders.map((order,index) => <Order {...order} key={index} />)
        }
      </Stack>
    </Stack>
  );
};

export default Orders;
