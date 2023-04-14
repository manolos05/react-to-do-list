import { useState } from "react"
import TaskElements from "./TaskElements" 
import '../App.css';

export const Todo = () =>{

    const [text, setText] = useState("")
    const [list, setList] = useState([])
    


    const handleInput = (event) =>{
        setText(event.target.value)
        console.log(handleInput)
    }
    
    const handleClick = () => {
        const newList = [...list];
        newList.push(text);
        setList(newList);
       setText('');
      
     
    }

    
    const handleDelete = (i) => {
    
        const filterList = list.filter((eList, index) => i !== index);

            setList(filterList)
    }

   

   


    return (
        <div className="container">

                <h1>TODO</h1>
            
            <form>
            
                <input 
                type="text"
                placeholder="Whats need to be done?"
                onChange={(e) => {handleInput(e)}}
                value={text}
                />
                <button
                onClick={handleClick} disabled={!text}><strong>+</strong></button>

                        {list.map((eList, index) => ( 
                            <TaskElements 
                            key={index}
                            task={eList}
                            onClick={()=>handleDelete(index)}
                                        
                            />)
                        )}
                        <p>{list.length} item left </p>
            </form>
        </div>
  

    )
        
        
}