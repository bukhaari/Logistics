import React, { createContext, useState, useEffect } from "react";
import {
  getDrivers,
  postDriver,
  putDriver,
  deleteDriver,
} from "../Services/driverServices";
import Swal from "sweetalert2";

export const DriverContext = createContext();
DriverContext.displayName = "DriverContext";

const DriverContextProvider = (props) => {
  const [Drivers, setDrivers] = useState([]);
  useEffect(() => {
    const handleDriver = async () => {
      try {
        const { data } = await getDrivers();
        setDrivers(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Drivers was not found!");
          console.log(error);
        }
      }
    };

    handleDriver();
  }, []);

  const [newDriver, setNewDriver] = useState({
    fullName: "",
    tellPhone: "",
    address: "",
    date: new Date(),
  });

  // //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postDriver(newDriver);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New Driver",
        showConfirmButton: false,
        timer: 700,
      });
      setDrivers((prevDrivers) => {
        return [...prevDrivers, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex.response);
    }
    setNewDriver({
      fullName: "",
      tellPhone: "",
      address: "",
      date: new Date(),
    });
  };

  // // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Drivers;
    const UpdateDriver = Drivers.find((c) => c._id === newDriver._id);
    UpdateDriver.fullName = newDriver.fullName;
    UpdateDriver.tellPhone = newDriver.tellPhone;
    UpdateDriver.address = newDriver.address;
    UpdateDriver.date = newDriver.date;
    setDrivers((prevDriver) => {
      return [...prevDriver];
    });
    try {
      await putDriver(newDriver);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Driver!",
        showConfirmButton: false,
        timer: 700,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");

      setDrivers(OriginalState);
    }

    setNewDriver({
      fullName: "",
      tellPhone: "",
      address: "",
      date: new Date(),
    });
  };

  // // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to deleted this Driver!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const OriginalState = Drivers;
          await deleteDriver(id);
          const filterDrivers = OriginalState.filter((c) => c._id !== id);
          setDrivers(filterDrivers);
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Deleted Driver",
            showConfirmButton: false,
            timer: 700,
          });
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The Driver ID was not found!.");
    }
  };

  // // change value of inputs accepts date
  const handleChange = (e) => {
    setNewDriver((prevDriver) => {
      return { ...prevDriver, [e.target.name]: e.target.value };
    });
  };

  //changing value of Datepicker
  const handleDateChange = (dt) => {
    setNewDriver({ ...newDriver, date: dt });
  };

  // // Modal functionality
  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal)
      setNewDriver({
        fullName: "",
        tellPhone: "",
        address: "",
        date: new Date(),
      });
  };

  // // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (Driver) => {
    var updDriver = { ...Driver };
    updDriver.date = new Date(updDriver.date);
    setNewDriver(updDriver);
    handleModal();
  };

  return (
    <DriverContext.Provider
      value={{
        Drivers,
        newDriver,
        viewModal,
        handleModal,
        handleChange,
        handleAdd,
        handleUpdate,
        handleEdit,
        handleDelete,
        handleDateChange,
      }}
    >
      {props.children}
    </DriverContext.Provider>
  );
};

export default DriverContextProvider;
