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
          line: `${i+1}`,
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
          line: `${i+1}`,
          type: "text display",
          value
        })
      
        //TODO: agregar otros tipos de datos
      }else if(e.includes("int") && e.includes("(") && e.includes(")")){
        var value = e.substring(
          e.indexOf(" ") + 1, 
          e.lastIndexOf("(")
      );
        b.push({
          line: `${i+1}`,
          type: "function",
          value
        })
       //TODO: agregar otros tipos de datos
      }else if(e.includes("int") && e.includes("=")){
        var value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
      var name = e.substring(
        e.indexOf(" ")+1, 
        e.indexOf("=")
    );
        b.push({
          line: `${i+1}`,
          type: "variable",
          name,
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
