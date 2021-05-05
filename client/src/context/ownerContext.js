import React, { createContext, useState, useEffect } from "react";
import {
  getOwners,
  postOwner,
  putOwner,
  deleteOwner,
} from "../Services/ownerServices";
import Swal from "sweetalert2";

export const OwnerContext = createContext();
OwnerContext.displayName = "OwnerContext";

const OwnerContextProvider = (props) => {
  const [Owners, setOwners] = useState([]);
  useEffect(() => {
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

    handleOwner();
  }, []);

  const [newOwner, setNewOwner] = useState({
    fullName: "",
    tellphone: "",
    address: "",
    date: new Date()
  });

  // //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postOwner(newOwner);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New Owner",
        showConfirmButton: false,
        timer: 1000,
      });
      setOwners((prevOwners) => {
        return [...prevOwners, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex.response);
    }
    setNewOwner({ fullName: "", tellphone: "", address: "",date: new Date() });
  };

  // // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Owners;
    const UpdateOwner = Owners.find((c) => c._id === newOwner._id);
    UpdateOwner.fullName = newOwner.fullName;
    UpdateOwner.tellphone = newOwner.tellphone;
    UpdateOwner.address = newOwner.address;
    UpdateOwner.date = newOwner.date;
    setOwners((prevOwner) => {
      return [...prevOwner];
    });
    try {
      await putOwner(newOwner);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Owner!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");

      setOwners(OriginalState);
    }

    setNewOwner({ fullName: "", tellphone: "", address: "",date: new Date() });
  };

  // // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Did You want to deleted this Owner!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const OriginalState = Owners;
          await deleteOwner(id)
          const filterOwners = OriginalState.filter(c => c._id !== id);
          setOwners(filterOwners)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The owener ID was not found!.");
    }
  };

  // // change value of inputs accepts date
  const handleChange = (e) => {
    setNewOwner((prevCustomer) => {
      return { ...prevCustomer, [e.target.name]: e.target.value };
    });
  };

  //changing value of Datepicker
  const handleDateChange = (dt) => {
    setNewOwner({ ...newOwner, date: dt })
  }

  // // Modal functionality
  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal) setNewOwner({ fullName: "", tellphone: "", address: "",date: new Date() });
  };

  // // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (owener) => {
    var updowener = { ...owener };
    updowener.date = new Date(updowener.date);
    setNewOwner(updowener)
    handleModal()
  };

  return (
    <OwnerContext.Provider
      value={{
        Owners,
        newOwner,
        viewModal,
        handleModal,
        handleChange,
        handleAdd,
        handleUpdate,
        handleEdit,
        handleDelete,
        handleDateChange
      }}
    >
      {props.children}
    </OwnerContext.Provider>
  );
};

export default OwnerContextProvider;
