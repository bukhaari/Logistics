import React, { createContext, useState, useEffect } from "react";
import {
  getTypes,
  postType,
  putType,
  deleteType,
} from "../Services/TypeServices";
import Swal from "sweetalert2";

export const TypeContext = createContext();
TypeContext.displayName = "TypeContext";

const TypeContextProvider = (props) => {
  const [Types, setTypes] = useState([]);
  useEffect(() => {
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
  }, []);

  const [newType, setNewType] = useState({ name: "" });

  //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postType(newType);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New Type",
        showConfirmButton: false,
        timer: 1000,
      });
      setTypes((prevTypes) => {
        return [...prevTypes, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex);
    }
    setNewType({ name: "" });
  };

  // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Types;
    const UpdateType = Types.find((c) => c._id === newType._id);
    UpdateType.name = newType.name;
    setTypes((prevTypes) => {
      return [...prevTypes];
    });
    try {
      await putType(newType);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Type",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      setTypes(OriginalState);
    }
    setNewType({ Tname: "" });
  };

  // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to deleted this Type!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteType(id);
          const OriginalState = Types;
          const filterTypes = OriginalState.filter((c) => c._id !== id);
          setTypes(filterTypes);
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Deleted Type",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The Type ID was not found!.");
    }
  };

  const handleChange = (e) => {
    setNewType((prevType) => {
      return { ...prevType, [e.target.name]: e.target.value };
    });
  };

  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal) setNewType({ Tname: "" });
  };

  // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (Type) => {
    var updType = { ...Type };
    updType.date = new Date(updType.date);
    setNewType(updType);
    handleModal();
  };

  return (
    <TypeContext.Provider
      value={{
        Types,
        handleModal,
        viewModal,
        newType,
        handleChange,
        handleAdd,
        handleUpdate,
        handleDelete,
        handleEdit,
      }}
    >
      {props.children}
    </TypeContext.Provider>
  );
};

export default TypeContextProvider;
