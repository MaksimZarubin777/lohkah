import { useLocation } from "react-router-dom";
import Word from "./Word";

function Lesson({ data, isReversed }) {
  const location = useLocation();
  const lessonName = location.state.lesson;

  return (
    <div className="lesson">
      {data.map((dataElement) => {
        if (dataElement.name === lessonName) {
          return (
            <Word word={dataElement.words} isReversed={isReversed}/>
          )
        } 
        })
      }
    </div>
  );
}

export default Lesson;