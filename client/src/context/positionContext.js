import React, { createContext, useState, useEffect } from "react";
import {
  getPositions,
  postPosition,
  putPosition,
  deletePosition,
} from "../Services/positionServices";
import Swal from "sweetalert2";

export const PositionsContext = createContext();
PositionsContext.displayName = "PositionsContext";

const PositionsContextProvider = (props) => {
  const [Positions, setPositions] = useState([]);
  useEffect(() => {
    const handlePositions = async () => {
      try {
        const { data } = await getPositions();
        setPositions(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("position was not found!");
          console.log(error);
        }
      }
    };
    handlePositions();
  }, []);

  const [newPosition, setNewPosition] = useState({ state: "", district: "" });

  //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postPosition(newPosition);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New position",
        showConfirmButton: false,
        timer: 1000,
      });
      setPositions((prevPositions) => {
        return [...prevPositions, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex);
    }
    setNewPosition({ state: "", district: "" });
  };

  // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Positions;
    const UpdatePosition = Positions.find((c) => c._id === newPosition._id);
    UpdatePosition.state = newPosition.state;
    UpdatePosition.district = newPosition.district;

    setPositions((prevPositions) => {
      return [...prevPositions];
    });
    try {
      await putPosition(newPosition);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Postion",
        showConfirmButton: false,
        timer: 1900,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      setPositions(OriginalState);
    }
    setNewPosition({ state: "", district: "" });
  };

  // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to deleted this Position!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deletePosition(id);
          const OriginalState = Positions;
          const filterPositions = OriginalState.filter((c) => c._id !== id);
          setPositions(filterPositions);
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Deleted Postion",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The Position ID was not found!.");
    }
  };

  const handleChange = (e) => {
    setNewPosition((prevCustomer) => {
      return { ...prevCustomer, [e.target.name]: e.target.value };
    });
  };

  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal) setNewPosition({ state: "", district: "" });
  };

  // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (Position) => {
    var updPosition = { ...Position };
    updPosition.date = new Date(updPosition.date);
    setNewPosition(updPosition);
    handleModal();
  };

  return (
    <PositionsContext.Provider
      value={{
        Positions,
        handleModal,
        viewModal,
        newPosition,
        handleChange,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleEdit,
      }}
    >
      {props.children}
    </PositionsContext.Provider>
  );
};

export default PositionsContextProvider;
