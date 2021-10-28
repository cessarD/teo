import logo from './logo.svg';
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
for(int i=0;i<10;i++)
{
   printf("Hello World");
    cout << "Hello, World!";

    return 0;
}
}

    */
    let a=document.getElementById('code').value;
    //se eliminan filas vacias
    a=a.split('\n').filter(e => e!="")
    console.log(a)

    //TODO: Eliminar comentarios del codigo en el array original

   
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
       



        //TODO:si pueden agregar la tokenizacion del bucle while
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



    //agregar que en el div result se muestre todo el array b ya que alli esta la info para la tabla de simbolos
    console.log(b)


  }
  return (
    <div className="App">
      <header className="App-header">
   
        <div style={{display: 'flex',flexdirection: 'row',justifyContent:"space-around",width:"100%"}}>
          <textarea id="code" onChange={codigo} >

          </textarea>
          <div id="result">h</div>
        </div>
      </header>
    </div>
  );
}

export default App;
