import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../reducers/myOrderSlice";
import { myOrders } from "../../Actions/myOrderActions";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";

const MyOrder = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrder);

    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, "status") === "Delivered"
            //         ? "greenColor"
            //         : "redColor";
            // },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            // renderCell: (params) => {
            //     return (
            //         <Link to={`/order/${params.getValue(params.id, "id")}`}>
            //             <LaunchIcon />
            //         </Link>
            //     );
            // },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length === 0 ? 1 : item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, error]);

    return (
        <>
            <MetaData title={`${user.name} - Orders`} />

            {loading ? (
                <Loading />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />
                </div>
            )}
            <BottomTab />
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

export default MyOrder;