let listaImagenes = [];
let posicion = 0;
const imagenDiv = document.querySelector(".imagenes");
let auto;
const regresar = document.querySelector(".button.regrasar");
const adelantar = document.querySelector(".button.adelantar");
const divOpcion = document.querySelector(".opciones");

function botonRegresar(){
    regresar.addEventListener("click",()=>{
        const ops = document.querySelectorAll(".opcion");
        clearInterval(auto);
        while(imagenDiv.firstChild){
            imagenDiv.removeChild(imagenDiv.firstChild);
        }
        posicion--;
        if(posicion == -1){
            ops[0].classList.remove("activo");
            posicion = 4;
            ops[posicion].classList.add("activo");
            imagenDiv.appendChild(listaImagenes[4]);
        }else{
        imagenDiv.appendChild(listaImagenes[posicion]);
        ops[posicion+1].classList.remove("activo");
        ops[posicion].classList.add("activo");
        }
        
        
        
        mostrarImagen();

    });
}
function botonAdelantar(e){
    adelantar.addEventListener("click",()=>{
        const ops = document.querySelectorAll(".opcion");
        
        clearInterval(auto);
        while(imagenDiv.firstChild){
            imagenDiv.removeChild(imagenDiv.firstChild);
        }
        posicion++;
        if(posicion == 5){
            ops[4].classList.remove("activo");
            posicion = 0;
            ops[posicion].classList.add("activo");
            imagenDiv.appendChild(listaImagenes[0]);
        }else{
        imagenDiv.appendChild(listaImagenes[posicion]);
        ops[posicion-1].classList.remove("activo");
        ops[posicion].classList.add("activo");
        }
     
        mostrarImagen();
    });
}
const mostrarImagen=()=>{   
    auto= setInterval(() => {
        const opciones = document.querySelectorAll(".opcion");

        while(imagenDiv.firstChild){
            imagenDiv.removeChild(imagenDiv.firstChild);
        }
        posicion++; 
        if(posicion == 5){
            opciones[4].classList.remove("activo");
            opciones[0].classList.add("activo")
            posicion = 0;
            imagenDiv.appendChild(listaImagenes[posicion]);     
        }else{
        imagenDiv.appendChild(listaImagenes[posicion]); 
        opciones[posicion-1].classList.remove("activo");
        opciones[posicion].classList.add("activo");
    }
    // opciones.forEach(opcion => {
    // });
        
    }, 3000);
        

}
const crearImagen = () =>{
    const imagenes = ["img-1.jpg","img-2.jpg","img-3.jpg","img-4.jpg","img-5.jpg"];
    imagenes.forEach((imagen, i) =>{
        const imagenCarrucel = document.createElement("IMG");
        imagenCarrucel.src = `img/${imagen}`;
        imagenCarrucel.alt = `imagen-${i+1}`;
        imagenCarrucel.classList.add("img");
        listaImagenes = [...listaImagenes,imagenCarrucel];
    });
    
    imagenDiv.appendChild(listaImagenes[posicion]);
    
    
}
const crearSeleccionador=()=>{
    
    for (let i = 0; i < listaImagenes.length; i++) {
        const div = document.createElement("DIV");
        if(i===0){
            div.classList.add("activo");
        }
        div.dataset.id = i;
        div.classList.add("opcion");
        divOpcion.appendChild(div);
        // if(i=0){
        //     divOpcion.classList.add("activo");
        // }
    }
    
    
}
function seleccionarImagenes(){
    const opciones = document.querySelectorAll(".opcion");
    opciones.forEach(opcion =>{
        opcion.addEventListener("click",(e)=>{
            opciones.forEach(ops => {
                if(ops.classList.contains("activo")){
                    ops.classList.remove("activo");
                }
            });
            const imgSeleccionada =  parseInt(e.target.dataset.id);
            while(imagenDiv.firstChild){
                imagenDiv.removeChild(imagenDiv.firstChild);
            }
            imagenDiv.appendChild(listaImagenes[imgSeleccionada]);
            posicion = imgSeleccionada;
            opcion.classList.add("activo");
            clearInterval(auto);
            mostrarImagen();



        });
    });

}
document.addEventListener("DOMContentLoaded",()=>{
    //creamos las imagenes
    crearImagen();
    //agregar al html
    mostrarImagen();
    //mostrar con los botones
    botonRegresar();

    botonAdelantar();

    //crearCeleccionador
    crearSeleccionador();
    seleccionarImagenes();
});