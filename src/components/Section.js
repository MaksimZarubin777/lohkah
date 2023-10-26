import Card from "./Card";
import Header from "./Header";

function Section ( {data, title} ) {

  return (
    <div className="content">
      {data.map((dataElement) => {
        if (title === undefined) {
          return(
            <Card title={dataElement.name}/>
          )
        } else {
          if (dataElement.department === title) {
            return(
              <Card title={dataElement.name} />
            )
          }
        }
      })
      }
    </div>
  )
}

export default Section;