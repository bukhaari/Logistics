import React, { createContext, useState, useEffect } from "react";
import {
  getProjects,
  postProject,
  putProject,
  putSatatus,
  complateProject,
} from "../Services/projectServices";
import { getPositions } from "../Services/positionServices";
import Swal from "sweetalert2";
import _ from "lodash";

export const ProjectContext = createContext();
ProjectContext.displayName = "ProjectContext";

const ProjectContextProvider = (props) => {
  const [Projects, setProjects] = useState([]);
  const [Positions, setPositions] = useState([]);
  useEffect(() => {
    var position;
    const handlePositions = async () => {
      try {
        position = await getPositions();
        setPositions(position.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Projects was not found!");
          console.log(error);
        }
      }
    };
    handlePositions();

    const handleProject = async () => {
      try {
        const { data } = await getProjects();
        // const projectview = data.map((d) => {
        //   const project = {
        //     _id: d._id,
        //     status: d.status,
        //     isComplate: d.isComplate,
        //     name: d.name,
        //     positions: d.positions,
        //     // .map((p) => {
        //     //   return position.data.find((pos) => {
        //     //     if (p._id === pos._id) return pos;
        //     //   });
        //     // }),
        //     startDate: d.startDate,
        //     endDate: d.endDate,
        //     requiredCar: d.requiredCar,
        //   };
        //   return project;
        // });

        setProjects(data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Projects was not found!");
          console.log(error);
        }
      }
    };
    handleProject();
  }, []);

  // console.log("Projects", Projects);

  const [newProject, setNewProject] = useState({
    name: "",
    requiredCar: "",
    startDate: new Date(),
    endDate: new Date(),
    positions: [],
  });

  // //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const positionProject = Positions.find((p) => {
        if (p._id === newProject.positions.label) return;
      });
      console.log(positionProject);
      // const postData = {
      //   name: newProject.name,
      //   requiredCar: newProject.requiredCar,
      //   startDate: newProject.startDate,
      //   endDate: newProject.endDate,
      //   positions: positionProject,
      // };
      const { data } = await postProject(newProject);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Created New Project",
        showConfirmButton: false,
        timer: 1000,
      });
      setProjects((prevProjects) => {
        return [...prevProjects, data];
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");
      console.log(ex.response);
    }
    setNewProject({
      name: "",
      requiredCar: "",
      startDate: new Date(),
      endDate: new Date(),
      positions: [],
    });
  };

  const hanleUpdateStatus = async (id) => {
    const UpdateProject = Projects.find((c) => c._id === id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to update Project status!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, updated it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (UpdateProject.status === true) {
            UpdateProject.status = false;
          } else if (UpdateProject.status === false) {
            UpdateProject.status = true;
          }
          const statusData = {
            _id: id,
            status: UpdateProject.status,
          };
          await putSatatus(statusData);
          setProjects((prevProject) => {
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

  const hanlecomplateProject = async (id) => {
    const UpdateProject = Projects.find((c) => c._id === id);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Did You want to Complate Project!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Complated it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (UpdateProject.isComplate === false) {
            UpdateProject.isComplate = true;
            UpdateProject.status = false;
          } else if (UpdateProject.isComplate === true) {
            UpdateProject.isComplate = false;
            UpdateProject.status = true;
          }
          const complateData = {
            _id: id,
            isComplate: UpdateProject.isComplate,
            status: UpdateProject.status,
          };
          await complateProject(complateData);
          setProjects((prevProject) => {
            return [...prevProject];
          });
          Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Complated Project!",
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

  // // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Projects;
    const UpdateProject = Projects.find((c) => c._id === newProject._id);
    UpdateProject.name = newProject.name;
    UpdateProject.requiredCar = newProject.requiredCar;
    UpdateProject.startDate = newProject.startDate;
    UpdateProject.endDate = newProject.endDate;
    UpdateProject.endDate = newProject.positions;
    setProjects((prevProject) => {
      return [...prevProject];
    });
    try {
      await putProject(newProject);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Updated Project!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");

      setProjects(OriginalState);
    }

    setNewProject({
      name: "",
      requiredCar: "",
      startDate: new Date(),
      endDate: new Date(),
      positions: [],
    });
  };

  // // change value of inputs accepts date
  const handleChange = (e) => {
    setNewProject((prevProjects) => {
      return { ...prevProjects, [e.target.name]: e.target.value };
    });
  };

  //changing value of Datepicker
  const handleStartDateChange = (dt) => {
    setNewProject({ ...newProject, startDate: dt });
  };

  const handleEndDateChange = (dt) => {
    console.log(dt);
    setNewProject({ ...newProject, endDate: dt });
  };

  const handleChangePositions = (data) => {
    setNewProject((prevP) => ({
      ...prevP,
      positions: data,
    }));
  };

  // // Modal functionality
  const [viewModal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal)
      setNewProject({
        name: "",
        requiredCar: "",
        startDate: new Date(),
        endDate: new Date(),
        positions: [],
      });
  };

  // // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (owener) => {
    console.log(owener);
    var updowener = { ...owener };
    updowener.startDate = new Date(updowener.startDate);
    updowener.endDate = new Date(updowener.endDate);

    setNewProject(updowener);
    handleModal();
  };

  return (
    <ProjectContext.Provider
      value={{
        Projects,
        Positions,
        newProject,
        viewModal,
        handleModal,
        handleChange,
        handleAdd,
        handleUpdate,
        handleEdit,
        handleStartDateChange,
        handleEndDateChange,
        handleChangePositions,
        hanleUpdateStatus,
        hanlecomplateProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
