import React, { createContext, useState, useEffect } from "react";
import {
  getCar,
  getCars,
  postCar,
  putCar,
  deleteCar,
} from "../Services/carServices";
import { getDrivers } from "../Services/driverServices";
import { getOwners } from "../Services/ownerServices";
import { getTypes } from "../Services/TypeServices";
import Swal from "sweetalert2";

export const CarContext = createContext();
CarContext.displayName = "CarContext";

const CarContextProvider = (props) => {
  const [Cars, setCars] = useState([]);
  // const [UpdateCars, setUpdateCars] = useState([]);
  const [Owners, setOwners] = useState([]);
  const [Drivers, setDrivers] = useState([]);
  const [Types, setTypes] = useState([]);
  useEffect(() => {
    const handleCar = async () => {
      try {
        const { data } = await getCars();
        const carData = data.map((d) => {
          const data = {};
          data.carType = d.carType.name;
          data.driver = d.driver.fullName;
          data.owner = d.owner.fullName;
          data.ownerId = d.owner._id;
          data.Allowner = d.owner;
          data.ownerNumber = d.owner.tellphone;
          data._id = d._id;
          data.plate = d.plate;
          data.state = d.state;
          data.status = d.status;
          data.rejectContract = d.rejectContract;
          data.successContract = d.successContract;
          data.date = d.date;
          return data;
        });
        setCars(carData);
        // setUpdateCars(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Cars was not found!");
          console.log(error);
        }
      }
    };

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

    const handleOwner = async () => {
      try {
        const { data } = await getOwners();
        setOwners(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Owners was not found!");
          console.log(error);
        }
      }
    };

    const handleTypes = async () => {
      try {
        const { data } = await getTypes();
        setTypes(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Type was not found!");
          console.log(error);
        }
      }
    };
    handleTypes();
    handleOwner();
    handleDriver();
    handleCar();
  }, []);

  const [newCar, setNewCar] = useState({
    carTypeId: "",
    driverId: "",
    ownerId: "",
    plate: "",
    state: "",
    status: "",
    date: new Date(),
  });

  // //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postCar(newCar);
      const { data: car } = await getCar(data._id);
      const cardData = {};
      cardData.carType = car.carType.name;
      cardData.driver = car.driver.fullName;
      cardData.owner = car.owner.fullName;
      cardData._id = car._id;
      cardData.plate = car.plate;
      cardData.state = car.state;
      cardData.status = car.status;
      cardData.date = car.date;
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New Car",
        showConfirmButton: false,
        timer: 1000,
      });
      setCars((prevCars) => {
        return [...prevCars, cardData];
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
      status: "",
      date: new Date(),
    });
  };

  // // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Cars;
    const updateCar = Cars.find((c) => c._id === newCar._id);
    const driver = Drivers.find((d) => d._id === newCar.driverId);
    const type = Types.find((t) => t._id === newCar.carTypeId);
    const owner = Owners.find((o) => o._id === newCar.ownerId);

    updateCar.carType = type.name;
    updateCar.driver = driver.fullName;
    updateCar.owner = owner.fullName;
    updateCar.plate = newCar.plate;
    updateCar.state = newCar.state;
    updateCar.status = newCar.status;
    updateCar.date = newCar.date;

    setCars((prevCar) => {
      return [...prevCar];
    });
    try {
      await putCar(newCar);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Car!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");

      setCars(OriginalState);
    }

    setNewCar({
      carTypeId: "",
      driverId: "",
      ownerId: "",
      plate: "",
      state: "",
      status: "",
      date: new Date(),
    });
  };

  // // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to deleted this Car!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const OriginalState = Cars;
          await deleteCar(id);
          const filterCars = OriginalState.filter((c) => c._id !== id);
          setCars(filterCars);
          Swal.fire("Deleted!", "car has been deleted.", "success");
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The Car ID was not found!.");
    }
  };

  // // change value of inputs accepts date
  const handleChange = (e) => {
    setNewCar((prevCars) => {
      return { ...prevCars, [e.target.name]: e.target.value };
    });
  };

  //changing value of Datepicker
  const handleDateChange = (dt) => {
    setNewCar({ ...newCar, date: dt });
  };

  // // Modal functionality
  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal)
      setNewCar({
        carTypeId: "",
        driverId: "",
        ownerId: "",
        plate: "",
        state: "",
        status: "",
        date: new Date(),
      });
  };

  // // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = async (car) => {
    const { data: carData } = await getCar(car._id);
    const newdData = {};
    newdData.carTypeId = carData.carType._id;
    newdData.driverId = carData.driver._id;
    newdData.ownerId = carData.owner._id;
    newdData._id = carData._id;
    newdData.plate = carData.plate;
    newdData.state = carData.state;
    newdData.status = carData.status;
    newdData.date = carData.date;

    var updcar = { ...newdData };
    updcar.date = new Date(updcar.date).toLocaleDateString();
    updcar.date = new Date(updcar.date);
    setNewCar(updcar);
    handleModal();
  };

  return (
    <CarContext.Provider
      value={{
        Cars,
        Owners,
        Drivers,
        Types,
        newCar,
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
    </CarContext.Provider>
  );
};

export default CarContextProvider;
