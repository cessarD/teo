import logo from './logo.svg';
import './App.css';

function App() {
  function codigo() {
    
    let a=document.getElementById('code').value;
    //se eliminan filas vacias
    a=a.split('\n').filter(e => e!="")
    console.log(a)



    //simbolos
   
    var b=[]

    a.forEach((e,i)=>{
      //limpieza del elemento
      e=e.replace(";","")
      if(e.includes("#include")){
        var value = e.substring(
          e.indexOf("<") + 1, 
          e.lastIndexOf(">")
      );
        b.push({
          line: `${i}`,
          type: "library",
          value
        })
        //console.log(e)
      }else if(e.includes("cout")){
        var value = e.substring(
          e.indexOf("\"") + 1, 
          e.lastIndexOf("\"")
      );
        b.push({
          line: `${i}`,
          type: "text display",
          value
        })
        //console.log(e)
      }
      
    })

    console.log(b)

  }
  return (
    <div className="App">
      <header className="App-header">
   
        <div style={{display: 'flex',flexdirection: 'row',justifyContent:"space-around",width:"100%"}}>
          <textarea id="code" onChange={codigo} >

          </textarea>
          <div>h</div>
        </div>
      </header>
    </div>
  );
}

export default App;
