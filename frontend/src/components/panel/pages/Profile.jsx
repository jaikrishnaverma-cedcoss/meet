import React from "react";
import UserForm from "../../common/UserForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const { session } = useSelector((data) => data.mainSlice);
  return <UserForm callBack={() => {}} id={session?.id} forProfile={true}/>;
};

export default Profile;
