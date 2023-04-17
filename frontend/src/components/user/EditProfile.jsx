import React, { useState, useEffect, Fragment } from "react";
import "./EditProfile.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "../../Actions/profileActions";
import { loadUser } from "../../Actions/userActions";
import { clearErrors, setUpdateReset } from "../../reducers/profileSlice";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(
        (state) => state.user
    );

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avtar, setAvtar] = useState();
    const [avtarPreview, setAvtarPreview] = useState("/profile.png");


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avtar", avtar);
        dispatch(updateProfile(myForm)).then(() => {
            alert('profile updated successfully');
        })
    };

    // console.log(avtar);

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvtarPreview(reader.result);
                setAvtar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvtarPreview(user.avtar.url)
        }

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert('profile updated successfully');
            dispatch(loadUser());

            navigate("/me");

            dispatch(setUpdateReset());
        }
    }, [user, dispatch, navigate, isUpdated, error]);


    return (
        <>
            {loading ? (<Loading />) : (
                <>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>

                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img src={avtarPreview} alt="Avtar Preview" />
                                    <input
                                        type="file"
                                        name="avtar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
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
    )
}

export default EditProfile
