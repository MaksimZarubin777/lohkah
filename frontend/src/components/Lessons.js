// checked
import Card from "./Card";
import { useLocation } from "react-router-dom";

function Lessons ({ data, handleDeleteLesson, handleUpdateLesson, onChange }) {
  const location = useLocation();
  const currentDepartment = location.state.departmentData;

  return(
    <div className="content">
      {data.map((department) => {
        if (department._id === currentDepartment._id) {
          return (
            department.lessons.map((lesson) => {
              return (
                <Card 
                  title = {lesson.lessonName} 
                  lessonData = {lesson} 
                  currentDepartment = {currentDepartment} 
                  handleDeleteLesson = {handleDeleteLesson} 
                  handleUpdateLesson = {handleUpdateLesson}
                  onChange = {onChange}
                />
              )
            })
          )
        }
      })}
    </div>
  )
}

export default Lessons;