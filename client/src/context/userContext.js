import React, { createContext, useState } from "react";
// import { postUser } from "../Services/loginService";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

const UserProvider = (props) => {
  const [newUser, setUser] = useState({ username: "", password: "", name: "" });

  // //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postCar(newUser);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New User",
        showConfirmButton: false,
        timer: 1000,
      });
      setUser((prevUsers) => {
        return [...prevUsers, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex.response);
    }
    setNewCar({
      carTypeId: "",
      driverId: "",
      ownerId: "",
      plate: "",
      state: "",
      date: new Date(),
    });
  };

  return (
    <UserContext.Provider
      value={{
        newUser,
        handleAdd,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
