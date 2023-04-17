import React, { useRef, useState } from 'react'
import MetaData from './Metadata';
import "./Report.css";
import emailjs from "@emailjs/browser";
import BottomTab from './BottomTab.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import UserData from './UserData';
import Header from '../components/Home/Header';

const Report = () => {

    const { user, isAuthenticated } = useSelector((state) => state.user);

    const formRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        emailjs.sendForm('service_kmt95gl', 'template_tt61hzr', formRef.current, '3G21tNx_CqMA9OkDH')
            .then((result) => {
                toast.success('Thank you for reporting us! We will see your problem and come to you soon.');
            }, (error) => {
                console.log(error.text);
            });

    }

    return (
        <>
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
            <MetaData title="Report" />
            {isAuthenticated && <UserData user={user} />}
            <Header />
            <div
                className='support'
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: '50px 0'
                }}>
                <h2 className='support__heading' style={{
                    textAlign: "center"
                }}>Hey How can we improve our services</h2>
                <h2 className='support__heading' style={{
                    textAlign: "center"
                }}>Report us for something...</h2>
                <div>
                    <form style={{
                        width: "400px",
                        margin: "auto",
                        padding: "20px 0"
                    }} ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <input type="text" placeholder='Write your Name ...' required style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            borderBottom: "1px solid #3BB77E",
                            margin: "10px 0",
                            fontSize: "1.2vmax",
                            height: "40px"
                        }}
                            name='user__name'
                        />
                        <input type="text" placeholder='Write a Subject ...' required style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            borderBottom: "1px solid #3BB77E",
                            margin: "10px 0",
                            fontSize: "1.2vmax",
                            height: "40px"
                        }}
                            name='user__subject'
                        />
                        <input type="email" placeholder='write your Email ...' required style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            borderBottom: "1px solid #3BB77E",
                            margin: "10px 0",
                            fontSize: "1.2vmax",
                            height: "40px"
                        }} />
                        <textarea cols="30" rows="5" required placeholder='write your message ...'
                            style={{
                                border: "none",
                                outline: "none",
                                width: "100%",
                                borderBottom: "1px solid #3BB77E",
                                margin: "10px 0",
                                fontSize: "1.2vmax",
                            }}
                            name='user__message'
                        ></textarea>
                        <button
                            style={{
                                border: "none",
                                cursor: "pointer",
                                width: "100%",
                                background: "#3BB77E",
                                height: "40px",
                                margin: "10px 0",
                                color: "#fff",
                                fontSize: "1.2vmax"
                            }}

                        >Submit</button>
                    </form>
                    <div className='animation'>

                    </div>
                </div>
            </div>
            <BottomTab />
        </>
    )
}

export default Report