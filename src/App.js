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
    var scope=["global"]
    a.forEach((e,i)=>{
      //limpieza del elemento
      if(e[e.length-1]==";"){
        e=e.replace(";","")
      }
  
      if(e.includes("#include")){
        var value = e.substring(
          e.indexOf("<") + 1, 
          e.lastIndexOf(">")
      );
        b.push({
          line: `${i+1}`,
          type: "library",
          value,
          scope:scope[scope.length-1]
        })
        //console.log(e)
      }else if(e.includes("for")){
        var value = e.substring(
          e.indexOf("(") + 1, 
          e.lastIndexOf(")")
      );
      value=value.split(";");
        b.push({
          line: `${i+1}`,
          type: "bucle",
          initial_value:value[0],
          limit_value:value[1],
          step:value[2],
          scope:scope[scope.length-1]
        })
      
        //TODO: agregar otros tipos de datos
      }else if(e.includes("cout")){
        var value = e.substring(
          e.indexOf("\"") + 1, 
          e.lastIndexOf("\"")
      );
        b.push({
          line: `${i+1}`,
          type: "text display",
          value,
          scope:scope[scope.length-1]
        })
      
        //TODO: agregar otros tipos de datos
      }else if(e.includes("printf")){
        var value = e.substring(
          e.indexOf("\"") + 1, 
          e.lastIndexOf("\"")
      );
        b.push({
          line: `${i+1}`,
          type: "text display",
          value,
          scope:scope[scope.length-1]
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
          value,
          scope:scope[scope.length-1]
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
          value,
          scope:scope[scope.length-1]
        })
        //console.log(e)
      }else if(e=="{"){
        scope.push(a[i-1])
     
      }else if(e=="}"){
        scope.pop()
     
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
