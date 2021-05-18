import React, { createContext, useState, useEffect } from "react";
import {
  getPositions,
  postPosition,
  putPosition,
  getPosition,
} from "../Services/positionServices";
import { getStates } from "../Services/statePositionServices";
import Swal from "sweetalert2";

export const PositionsContext = createContext();
PositionsContext.displayName = "PositionsContext";

const PositionsContextProvider = (props) => {
  const [Positions, setPositions] = useState([]);
  const [State, setState] = useState([]);
  useEffect(() => {
    const handlePositions = async () => {
      try {
        const { data } = await getPositions();
        const positionData = data.map((d) => {
          const position = {
            _id: d._id,
            state: d.state.name,
            district: d.district,
          };
          return position;
        });
        setPositions(positionData);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("position was not found!");
          console.log(error);
        }
      }
    };
    handlePositions();

    const handleStatePosition = async () => {
      try {
        const { data } = await getStates();
        setState(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("position was not found!");
          console.log(error);
        }
      }
    };
    handleStatePosition();
  }, []);
  const [newPosition, setNewPosition] = useState({ state: "", district: "" });

  //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postPosition(newPosition);
      const { data: position } = await getPosition(data._id);

      const positionData = {
        _id: position._id,
        state: position.state.name,
        district: position.district,
      };

      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New position",
        showConfirmButton: false,
        timer: 1000,
      });
      setPositions((prevPositions) => {
        return [...prevPositions, positionData];
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
  const handleEdit = async (position) => {
    const { data: positionData } = await getPosition(position._id);
    const newData = {
      _id: positionData._id,
      state: positionData.state._id,
      district: positionData.district,
    };
    console.log(newData);
    setNewPosition(newData);
    handleModal();
  };

  return (
    <PositionsContext.Provider
      value={{
        Positions,
        State,
        handleModal,
        viewModal,
        newPosition,
        handleChange,
        handleAdd,
        handleUpdate,
        handleEdit,
      }}
    >
      {props.children}
    </PositionsContext.Provider>
  );
};

export default PositionsContextProvider;
