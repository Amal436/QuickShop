import React, { useEffect, useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Report from '@mui/icons-material/ReportProblem';
import HeartIcon from '@mui/icons-material/FavoriteBorder';
import HeartActiveIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../Actions/userActions";
import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from "../Actions/userActions";

const UserData = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);
    const { favouriteItems } = useSelector((state) => state.favourite);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const scroolEffect = useRef(null);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            document.querySelector(".speedDial").classList.add("active");
        }
        else {
            document.querySelector(".speedDial").classList.remove("active");
        }
    })

    const dispatch = useDispatch();

    const options = [
        { icon: <HomeIcon />, name: "Home", func: home },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        {
            icon: (
                <ShoppingCartIcon
                    style={{
                        color: cartItems.length === 0 ? "" : "tomato",
                    }}
                />
            ),
            name: `Cart (${cartItems.length})`,
            func: cart,
        },
        {
            icon:
                <HeartIcon
                    style={{
                        color: favouriteItems.length === 0 ? "" : "tomato",
                    }}
                />,
            name:
                `Favourite (${favouriteItems.length})`,
            func: favourite,
        },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <Report />, name: "Report us", func: report },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    if (user.role === "Creator") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate("/dashboard");
    }
    function home() {
        navigate("/");
    }
    function orders() {
        navigate("/orders");
    }
    function cart() {
        navigate("/cart");
    }
    function favourite() {
        navigate("/favourites");
    }
    function account() {
        navigate("/me");
    }

    function report() {
        navigate("/report");
    }


    function logoutUser() {
        const confirmed = window.confirm("Do you want to log out?");
        if (confirmed) {
            dispatch(logout())
                .then(() => {
                    toast.success("You have been successfully logged out. Thank you for using our service.")
                    setTimeout(() => {
                        navigate("/login");
                    }, 5000);
                })
                .catch((error) => {
                    console.error('Logout error:', error);
                });
        }
    }



    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                useRef={scroolEffect}
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avtar.url ? user.avtar.url : ("/profile.png")}
                        alt="Profile"
                        style={{
                            position: "fixed"
                        }}
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={false}
                    />
                ))}
            </SpeedDial>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default UserData;