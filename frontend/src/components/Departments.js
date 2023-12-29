// checked
import Card from "./Card";

function Departments ({ 
  departments, 
  handleDeleteDepartment, 
  handleUpdateDepartment, 
  onChange 
}) {
  return(
    <div className="content">
      { departments.map((department) => {
          return (
            <Card 
              title = {department.department} 
              departmentData = {department} 
              handleDeleteDepartment = {handleDeleteDepartment} 
              handleUpdateDepartment = {handleUpdateDepartment} 
              onChange = {onChange}/>
          )
        })
      }
    </div>
  );
};

export default Departments;