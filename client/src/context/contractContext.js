import React, { createContext, useState, useEffect } from "react";
import {
  getContract,
  getContracts,
  postContract,
  putContract,
  putSatatus,
} from "../Services/contractServices";
import { getPositions } from "../Services/positionServices";
import { getProjects } from "../Services/projectServices";
import { getCars } from "../Services/carServices";
import Swal from "sweetalert2";
import _ from "lodash";

export const ContractContext = createContext();
ContractContext.displayName = "ContractContext";

const ContractContextProvider = (props) => {
  const [Contracts, setContracts] = useState([]);
  const [Cars, setCars] = useState([]);
  const [Projects, setProjects] = useState([]);
  const [Positions, setPositions] = useState([]);
  const [AllPositions, setAllPositions] = useState([]);
  useEffect(() => {
    var positions;
    const handleAllPositions = async () => {
      try {
        positions = await getPositions();
        setAllPositions(positions.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("AllPositions was not found!");
          console.log(error);
        }
      }
    };
    handleAllPositions();

    const handleContract = async () => {
      try {
        const { data } = await getContracts();
        const ContractData = data
          .map((d) => {
            const data = {
              _id: d._id,
              owner: d.owner.fullName,
              driver: d.driver.fullName,
              carType: d.carType.name,
              carPlate: d.car.plate,
              projectName: d.project.name,
              startDate: d.project.startDate,
              endDate: d.project.endDate,
              position: positions.data.find((p) => {
                if (p._id === d.position._id) return p;
              }),
              signName: d.signName,
              contractType: d.contractType,
              dailyMoney: d.dailyMoney,
              status: d.status,
              isComplate: d.project.isComplate,
              projectStatus: d.project.status,
            };

            return data;
          })
          .filter((d) => {
            console.log("d", d);
            if (d.isComplate === false && d.projectStatus === true) return d;
          });
        setContracts(ContractData);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Contracts was not found!");
          console.log(error);
        }
      }
    };
    handleContract();

    const handleProjects = async () => {
      try {
        const { data } = await getProjects();
        const project = data.filter((d) => {
          if (d.isComplate === false && d.status === true) return d;
        });
        setProjects(project);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Projects was not found!");
          console.log(error);
        }
      }
    };
    handleProjects();

    const handleCars = async () => {
      try {
        const { data } = await getCars();
        setCars(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Cars was not found!");
          console.log(error);
        }
      }
    };
    handleCars();
  }, []);

  const [newContract, setNewContract] = useState({
    dailyMoney: "",
    contractType: "",
    signName: "",
    signNumber: "",
    projectId: "",
    carId: "",
    positionId: "",
  });

  // only Positions
  useEffect(() => {
    const handlePosition = () => {
      const project = Projects.filter((pro) => {
        if (pro._id === newContract.projectId) return pro;
      });

      const Projectposition = project
        .map((pro) => pro.positions)
        .find((p) => {
          return p;
        });

      setPositions(Projectposition);
    };
    handlePosition();
  }, [newContract.projectId]);

  // //// Adding data on Databse
  const handleAdd = async () => {
    const SeachCar = { ...newContract };
    const car = Cars.find((c) => {
      if (c._id === SeachCar.carId) return c;
    });

    const postData = {
      ownerId: car.owner._id,
      driverId: car.driver._id,
      carTypeId: car.carType._id,
      carId: newContract.carId,
      projectId: newContract.projectId,
      positionId: newContract.positionId,
      signName: newContract.signName,
      signNumber: newContract.signNumber,
      contractType: newContract.contractType,
      dailyMoney: newContract.dailyMoney,
      status: newContract.status,
    };

    try {
      const { data } = await postContract(postData);
      const { data: Contract } = await getContract(data._id);
      const ContractdData = {
        _id: Contract._id,
        owner: Contract.owner.fullName,
        driver: Contract.driver.fullName,
        carType: Contract.carType.name,
        carPlate: Contract.car.plate,
        projectName: Contract.project.name,
        startDate: Contract.project.startDate,
        endDate: Contract.project.endDate,
        position: Contract.position,
        signName: Contract.signName,
        signNumber: Contract.signNumber,
        contractType: Contract.contractType,
        dailyMoney: Contract.dailyMoney,
        status: Contract.status,
      };
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New Contract",
        showConfirmButton: false,
        timer: 1000,
      });
      setContracts((prevContracts) => {
        return [...prevContracts, ContractdData];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex.response);
    }
    setNewContract({
      dailyMoney: "",
      contractType: "",
      signName: "",
      signNumber: "",
      projectId: "",
      carId: "",
      positionId: "",
    });
  };

  // // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Contracts;
    const viewContract = Contracts.find((c) => c._id === newContract._id);
    const SeachCar = { ...newContract };
    const car = Cars.find((c) => {
      if (c._id === SeachCar.carId) return c;
    });
    const Seachproject = { ...newContract };
    const project = Projects.find((c) => {
      if (c._id === Seachproject.projectId) return c;
    });

    const SeachPosition = { ...newContract };
    const position = AllPositions.find((c) => {
      if (c._id === SeachPosition.positionId) return c;
    });

    // Maching data
    const UpdatetData = {
      _id: newContract._id,
      ownerId: car.owner._id,
      driverId: car.driver._id,
      carTypeId: car.carType._id,
      carId: newContract.carId,
      projectId: newContract.projectId,
      positionId: newContract.positionId,
      signName: newContract.signName,
      signNumber: newContract.signNumber,
      contractType: newContract.contractType,
      dailyMoney: newContract.dailyMoney,
      status: newContract.status,
    };

    // updating data with array into datatabele
    viewContract.owner = car.owner.fullName;
    viewContract.driver = car.driver.fullName;
    viewContract.carType = car.carType.name;
    viewContract.carPlate = car.plate;
    viewContract.projectName = project.name;
    viewContract.position = position;
    viewContract.signName = newContract.signName;
    viewContract.signNumber = newContract.signNumber;
    viewContract.contractType = newContract.contractType;
    viewContract.dailyMoney = newContract.dailyMoney;
    viewContract.status = newContract.status;

    setContracts((prevContract) => {
      return [...prevContract];
    });

    try {
      await putContract(UpdatetData);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Contract!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");

      setContracts(OriginalState);
    }

    setNewContract({
      dailyMoney: "",
      contractType: "",
      signName: "",
      signNumber: "",
      projectId: "",
      carId: "",
      positionId: "",
    });
  };

  const hanleUpdateStatus = async (id) => {
    const UpdateContract = Contracts.find((c) => c._id === id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to update status!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, updated it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (UpdateContract.status === true) {
            UpdateContract.status = false;
          } else if (UpdateContract.status === false) {
            UpdateContract.status = true;
          }
          const statusData = {
            _id: id,
            status: UpdateContract.status,
          };
          await putSatatus(statusData);
          setContracts((prevProject) => {
            return [...prevProject];
          });
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Updated Status",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The project ID was not found!.");
    }
  };

  // // change value of inputs accepts date
  const handleChange = (e) => {
    setNewContract((prevContracts) => {
      return { ...prevContracts, [e.target.name]: e.target.value };
    });
  };

  // // Modal functionality
  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal)
      setNewContract({
        dailyMoney: "",
        contractType: "",
        signName: "",
        signNumber: "",
        projectId: "",
        carId: "",
        positionId: "",
      });
  };

  // // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = async (Contract) => {
    const { data: contractData } = await getContract(Contract._id);
    const newdData = {
      _id: Contract._id,
      dailyMoney: contractData.dailyMoney,
      contractType: contractData.contractType,
      signName: contractData.signName,
      signNumber: contractData.signNumber,
      positionId: contractData.position._id,
      projectId: contractData.project._id,
      carId: contractData.car._id,
      status: contractData.status,
    };
    setNewContract(newdData);
    handleModal();
  };

  return (
    <ContractContext.Provider
      value={{
        Contracts,
        Cars,
        Positions,
        Projects,
        newContract,
        viewModal,
        handleModal,
        handleChange,
        handleAdd,
        handleUpdate,
        handleEdit,
        hanleUpdateStatus,
      }}
    >
      {props.children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
