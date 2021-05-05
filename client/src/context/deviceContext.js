import React, { createContext, useState, useEffect } from 'react';
import { getDevices, postDevice, putDevice, deleteDevice } from '../Services/deviceServices';
import Swal from 'sweetalert2';

export const DeviceContext = createContext();
DeviceContext.displayName = "DeviceContext";

const DeviceContextProvider = (props) => {

  const [Devices, setDevices] = useState([]);
  useEffect(() => {
    const handleDevices = async () => {
      try {
        const { data } = await getDevices();
        setDevices(data)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Device was not found!")
          console.log(error)
        }
      }
    }
    handleDevices();
  }, [])

  const [newDevice, setnewDevice] = useState({
    deviceid: "", status: "", date: new Date()
  })

  //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postDevice(newDevice)
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Created New Device',
        showConfirmButton: false,
        timer: 1000
      })
      setDevices(prevDevices => {
        return [...prevDevices, data]
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Something wrong");
      console.log(ex)
    }
    setnewDevice({ deviceid: "", status: "", date: new Date() })
  }

  // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Devices;
    const UpdateDevice = Devices.find(c => c._id === newDevice._id)
    UpdateDevice.deviceid = newDevice.deviceid;
    UpdateDevice.status = newDevice.status;
    UpdateDevice.date = newDevice.date;
    setDevices(prevDevices => {
      return [...prevDevices]
    })
    try {
      await putDevice(newDevice)
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Updated Device',
        showConfirmButton: false,
        timer: 1000
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Something wrong");
      setDevices(OriginalState);
    }
    setnewDevice({ deviceid: "", status: "", date: new Date() })
  };

  // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Did You want to deleted this Device!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDevice(id)
          const OriginalState = Devices;
          const filterDevices = OriginalState.filter(c => c._id !== id);
          setDevices(filterDevices)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The Device ID was not found!.");
    }
  };

  const handleChange = (e) => {
    setnewDevice(prevDevice => {
      return { ...prevDevice, [e.target.name]: e.target.value }
    })
  };

  const [viewModal, setModal] = useState(false)
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal)
      setnewDevice({ deviceid: "", status: "", date: new Date() });
  }

  // This function will call into button in dataTable that display Modal and field Data.
  const handleEdit = (Device) => {
    var updDevice = { ...Device };
    updDevice.date = new Date(updDevice.date);
    setnewDevice(updDevice)
    handleModal()
  };

  return (
    <DeviceContext.Provider value={{ Devices, handleModal, viewModal, newDevice, handleChange, handleAdd, handleUpdate, handleDelete, handleEdit }}>
      {props.children}
    </DeviceContext.Provider>
  );
}

export default DeviceContextProvider;