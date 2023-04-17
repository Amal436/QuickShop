import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Success.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MetaData from "../../more/Metadata";
import { useSelector } from "react-redux";
import UserData from "../../more/UserData";

const Success = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    return (
        <div className="orderSuccess">
            {isAuthenticated && <UserData user={user} />}
            <MetaData title="order placed" />
            <CheckCircleIcon />
            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default Success;