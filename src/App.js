import './App.css';



//Finalizar TODO
//Preparar la documentacion


function App() {
  function codigo() {
    


    /* Codigo de prueba    PEGAR en el textarea y revisar consola
#include <iostream>
using namespace std;

int main() 
{



    return 0;

}

*/
    let a=document.getElementById('code').value;
    //se eliminan filas vacias
    a=a.split('\n').filter(e => e!=="")
    console.log(a)

    //TODO: Eliminar comentarios del codigo en el array original

   
    var b=[]
    var scope=["global"]
    var value = ""
    var name = ""

    a.forEach((e,i)=>{
      if(e[e.length-1]===";"){
        e=e.replace(";","")
      }
  
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
      //Comentarios multilinea
      else if(e.includes("/*")){
        value = e.substring(
          e.substring("*")
      );
        b.push({
          line: `${i+1}`,
          type: "comment",
          value,
          scope:scope[scope.length-1]
        })
      }
      

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
      
      
      }else if(e.includes("cout")){
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
      
        //TODO: agregar otros tipos de datos
      }else if(e.includes("int") && e.includes("(") && e.includes(")")){
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
       //TODO: agregar otros tipos de datos
      }else if(e.includes("int") && e.includes("=")){
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
        //console.log(e)
      }
      
      
      else if(e==="{"){
        scope.push(a[i-1])
     
      }else if(e==="}"){
        scope.pop()
     
      }
      
    })



    //agregar que en el div result se muestre todo el array b ya que alli esta la info para la tabla de simbolos
    console.log(b)


  }
  return (
    <div className="App">
      <header className="App-header">
        <div id="result">
            <p>Lenguaje tokenizador: Javascript</p>
            <p>Lenguaje tokenizado: C++</p>
        </div>
        <div style={{display: 'flex',flexdirection: 'row',justifyContent:"space-around",width:"100%", margin:50}}>
          <textarea id="code" onChange={codigo} cols="50" rows="15" >

          </textarea>
          <div id="result"> Resultados </div>
        </div>
      </header>
    </div>
  );
}

export default App;
