import React, { createContext, useState, useEffect } from 'react';
import { getEmployees, postEmployee, putEmployee, deleteEmployee } from '../Services/EmoloyeesServices';
import Swal from 'sweetalert2';

export const EmployeesContext = createContext();
EmployeesContext.displayName = "EmployeesContext";

const EmployeesContextProvider = (props) => {

  const [Employees, setEmployees] = useState([]);
  useEffect(() => {
    const handleEmployees = async () => {
      try {
        const { data } = await getEmployees();
        setEmployees(data)
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Emploees was not found!")
          console.log(error)
        }
      }
    }
    handleEmployees();
  }, [])

  const [newEmployee, setNewEmployee] = useState({
    name: "", type: "", status: "", salary: "", phone: "", date: new Date()
  })

  //// Adding data on Databse
  const handleAdd = async () => {
    try {
      const { data } = await postEmployee(newEmployee)
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Created New Emploee',
        showConfirmButton: false,
        timer: 1000
      })
      setEmployees(prevEmployees => {
        return [...prevEmployees, data]
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Something wrong");
      console.log(ex)
    }
    setNewEmployee({ name: "", type: "", status: "", salary: "", phone: "", date: new Date() })
  }

  // update data on Databse
  const handleUpdate = async () => {
    const OriginalState = Employees;
    const UpdateEmployee = Employees.find(c => c._id === newEmployee._id)
    const currentName = UpdateEmployee.name
    UpdateEmployee.name = newEmployee.name;
    UpdateEmployee.type = newEmployee.type;
    UpdateEmployee.status = newEmployee.status;
    UpdateEmployee.salary = newEmployee.salary;
    UpdateEmployee.phone = newEmployee.phone;
    UpdateEmployee.date = newEmployee.date;
    setEmployees(prevEmployees => {
      return [...prevEmployees]
    })
    try {
      await putEmployee(newEmployee)
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Updated '+currentName +" to " + UpdateEmployee.name,
        showConfirmButton: false,
        timer: 1900
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Something wrong");
      setEmployees(OriginalState);
    }
    setNewEmployee({ name: "", type: "", status: "", salary: "", phone: "", date: new Date() })
  };

  // Delete Data on database
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Did You want to deleted this Employee!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteEmployee(id)
          const OriginalState = Employees;
          const filterEmployees = OriginalState.filter(c => c._id !== id);
          setEmployees(filterEmployees)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("The Employee ID was not found!.");
    }
  };

  const handleChange = (e) => {
      setNewEmployee(prevCustomer => {
        return { ...prevCustomer, [e.target.name]: e.target.value }
      })
  };

   //changing only date from into the Datepicker
   const handleDateChange = (dt) => {
    setNewEmployee({ ...newEmployee, date: dt })
  }

  const [viewModal, setModal] = useState(false)
  const handleModal = () => {
    setModal(!viewModal);
    if (viewModal)
    setNewEmployee({ name: "", type: "", status: "", salary: "", phone: "", date: new Date() })
  }

   // This function will call into button in dataTable that display Modal and field Data.
   const handleEdit = (employee) => {
    var updEmployee= {...employee};
    updEmployee.date = new Date(updEmployee.date);
    setNewEmployee(updEmployee)
    handleModal()
  };

  return (
    <EmployeesContext.Provider value={{ Employees, handleModal, viewModal, newEmployee, handleChange, handleAdd, handleUpdate, handleDelete, handleEdit, handleDateChange }}>
      {props.children}
    </EmployeesContext.Provider>
  );
}

export default EmployeesContextProvider;