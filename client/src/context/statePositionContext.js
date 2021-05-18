import React, { createContext, useState, useEffect } from "react";
import {
  getStates,
  postState,
  putState,
} from "../Services/statePositionServices";
import Swal from "sweetalert2";

export const StateContext = createContext();
StateContext.displayName = "StateContext";

const StateContextProvider = (props) => {
  const [States, setStates] = useState([]);
  useEffect(() => {
    const handleStates = async () => {
      try {
        const { data } = await getStates();
        setStates(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("State was not found!");
          console.log(error);
        }
      }
    };
    handleStates();
  }, []);

  const [newState, setNewState] = useState({ name: "" });

  //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postState(newState);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New State",
        showConfirmButton: false,
        timer: 1000,
      });
      setStates((prevStates) => {
        return [...prevStates, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex);
    }
    setNewState({ name: "" });
  };

  // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = States;
    const UpdateState = States.find((c) => c._id === newState._id);
    UpdateState.state = newState.state;
    setStates((prevStates) => {
      return [...prevStates];
    });
    try {
      await putState(newState);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated State",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      setStates(OriginalState);
    }
    setNewState({ name: "" });
  };

  const handleChange = (e) => {
    setNewState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal) setNewState({ name: "" });
  };

  // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (State) => {
    var updState = { ...State };
    updState.date = new Date(updState.date);
    setNewState(updState);
    handleModal();
  };

  return (
    <StateContext.Provider
      value={{
        States,
        handleModal,
        viewModal,
        newState,
        handleChange,
        handleAdd,
        handleUpdate,
        handleEdit,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
