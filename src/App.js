import './App.css';


function App() {
  function codigo() {
    

    let a=document.getElementById('code').value;
    //se eliminan filas vacias
    a=a.split('\n').filter(e => e!=="")
   // console.log(a)

   
    var b=[]
    var scope=["global"]
    var value = ""
    var name = ""

    a.forEach((e,i)=>{
      if(e[e.length-1]===";"){
        e=e.replace(";","")
      }
      //Libreria
      if(e.includes("#include")){
          value = e.substring(
          e.indexOf("<") + 1, 
          e.lastIndexOf(">")
      );
        b.push({
          line: `${i+1}`,
          type: "library",
          value,
          scope:scope[scope.length-1]
        })
       
      }
      //Comentarios lineales
      else if(e.includes("//")){
        value = e.substring(
          e.indexOf("/") + 2
      );
        b.push({
          line: `${i+1}`,
          type: "comment",
          value,
          scope:scope[scope.length-1]
        })
      }
    //Bucle for
      else if(e.includes("for")){
        value = e.substring(
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
      }
      //Input y output
      else if(e.includes("cout")){
        value = e.substring(
          e.indexOf("\"") + 1, 
          e.lastIndexOf("\"")
      );
        b.push({
          line: `${i+1}`,
          type: "text display",
          value,
          scope:scope[scope.length-1]
        })
      }

      else if(e.includes("cin")){
        value = e.substring(
          e.indexOf(">>") + 3, 
      );
        b.push({
          line: `${i+1}`,
          type: "input text",
          value,
          scope:scope[scope.length-1]
        })
      }

      else if(e.includes("printf")){
         value = e.substring(
          e.indexOf("\"") + 1, 
          e.lastIndexOf("\"")
      );
        b.push({
          line: `${i+1}`,
          type: "text display",
          value,
          scope:scope[scope.length-1]
        })
      
      }
      //Funcion
      else if(e.includes("int") && e.includes("(") && e.includes(")")){
         value = e.substring(
          e.indexOf(" ") + 1, 
          e.lastIndexOf("(")
      );
        b.push({
          line: `${i+1}`,
          type: "function",
          value,
          scope:scope[scope.length-1]
        })
      }
      //Breakpoint
      else if(e.includes("return")){
        value = e.substring(
          e.indexOf("n") + 1, 
      );
        b.push({
          line: `${i+1}`,
          type: "Break point",
          value,
          scope:scope[scope.length-1]
        })
      }

      else if(e.includes("using")){
        value = e.substring(
         e.indexOf("g") + 1, 
     );
       b.push({
         line: `${i+1}`,
         type: "function",
         value,
         scope:scope[scope.length-1]
       })
     
     }
      //Tipos de datos
      else if(e.includes("int") && e.includes("=")){
         value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
      name = e.substring(
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
      }
      
      else if(e.includes("float") && e.includes("=")){
         value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
      name = e.substring(
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
      }
      else if(e.includes("char") && e.includes("=")){
         value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
      name = e.substring(
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
      }
      else if(e.includes("string") && e.includes("=")){
         value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
      name = e.substring(
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
      }
      else if(e.includes("bool") && e.includes("=")){
         value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
       name = e.substring(
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
      }
      else if(e.includes("double") && e.includes("=")){
         value = e.substring(
          e.indexOf("=")+1, 
          e.length, 
      );
      name = e.substring(
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
      }
      //Inicio y fin de bloque
      else if(e==="{"){
        scope.push(a[i-1])
     
      }else if(e==="}"){
        scope.pop()
      }
      //Palabras rechazadas al inicio de linea
      else {
        value = e.substring(
          e.indexOf(" ")+4);
        b.push({
          line: `${i+1}`,
          type: "Reject",
          value,
          scope:scope[scope.length-1]
        })
      }
      
    })

    //Parte de  la tabla
    var answer = ''
    answer += ` [<br/>`
    for (let i = 0; i < b.length; i++) {
      //console.log(Object.values(b[i]))
      if(b[i].type!="comment"){
        if(b[i].type!="bucle" && b[i].type!="Reject"){
        answer += `{
          <b>Linea:</b>${b[i].line},<br/>
          <b>Tipo:</b>${b[i].type},<br/>
          <b>valor:</b>${b[i].value},<br/>
          <b> alcance:</b>${b[i].scope},<br/>
          `
          answer += "},<br/>"
      }else if(b[i].type=="Reject"){
      
          answer += `{
            <b>Linea:</b>${b[i].line},<br/>
            <b>ERROR</b>
            
            `
            answer += "},<br/>"
        
      }else{
        answer += `{
          <b>Linea:</b>${b[i].line},<br/>
          <b>Tipo:</b>${b[i].type},<br/>
          <b>valor inicial:</b>${b[i].initial_value},<br/>
          <b>valor limite:</b>${b[i].limit_value},<br/>
          <b>paso:</b>${b[i].step},<br/>
          <b> alcance:</b>${b[i].scope},<br/>
          `
          answer += "},<br/>"
      }
    }
  
    }
    answer += "]"
    document.getElementById('tokens').innerHTML = answer;

    var tabla = ''
    var tbodyRef = document.getElementById('simbolos').getElementsByTagName('tbody')[0];

    for (let i = 0; i < b.length; i++) {
      //console.log(Object.values(b[i]))
      if(b[i].type!="comment"){
        if(b[i].type!="bucle"  && b[i].type!="Reject"){
        tabla+=`<tr>
          <td>${b[i].line}</td>
          <td>${b[i].type}</td>
          <td>${b[i].value}</td>
          <td>${b[i].scope}</td>
          </tr>`
      }else if(b[i].type=="Reject"){
       
        tabla+=`<tr>
          <td>${b[i].line}</td>
          <td colspan=3>ERROR</td>
        
          </tr>`
      } else {
        tabla+=`<tr>
        <td>${b[i].line}</td>
        <td>${b[i].type}</td>
        <td>inicial:${b[i].initial_value}<br>
        limite:${b[i].limit_value},<br>
        paso:${b[i].step}
        </td>
        <td>${b[i].scope}</td>
        </tr>`
    
    }
      }
    }
    tbodyRef.innerHTML=tabla
  
 
    console.log(b)


  }
  function tableview(){
    document.getElementById("result1").style.display="none"
    document.getElementById("result2").style.display="block"
  }
  function tokenview(){
    document.getElementById("result2").style.display="none"
    document.getElementById("result1").style.display="block"
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
            <p>Lenguaje tokenizador: Javascript</p>
            <p>Lenguaje tokenizado: C++</p>
        </div>
        <div style={{display: 'flex',flexdirection: 'row',justifyContent:"space-around",width:"100%", margin:50}}>
          <textarea id="code" onChange={codigo} cols="50" rows="15" >

          </textarea>
          <div id="result" style={{height:"100%"}}> Resultados 
          <div id="result1">
          <button onClick={tableview}>Cambiar a tabla</button>
          <span id="tokens">

          </span>
          </div>
          <div id="result2" style={{display:"none"}} >
            <button onClick={tokenview}>Cambiar a tokens</button>
            <table id="simbolos" border="1">
              <thead>
                <tr>
                <th>Linea</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Alcance</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
           </div>
        </div>
      </header>
    </div>
  );
}

export default App;
