let resultElement = document.querySelector('.result');
let rowId = 1;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ad50a2630fmshce771d4e382298fp1a9b83jsn71a95644c92f',
		'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
	}
};

fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1', options)
.then(result =>result.json())
.finally(() => {
    let loadingElement = document.querySelector('.loading');
    loadingElement.style.display='none';
})
.then(data =>{
    console.log(data);
    let mainContainer = document.querySelector('.main-container');
    let word = data[0];
    let wordArray = word.toUpperCase().split('');
    console.log(wordArray);
    
    let actualRow = document.querySelector('.row');
    
    drawSquares(actualRow);
    listenInput(actualRow);
    
    addFocus(actualRow);
    
    function listenInput(actualRow){
        let squares = actualRow.querySelectorAll('.square'); // importante seleccionar todos los squares LPM
        squares = [...squares]; // convierte al node list en array
    
        let userInput = []
    
        squares.forEach(element =>{
            element.addEventListener('input', event=>{
                //Si ni se borro
                if(event.inputType !== 'deleteContentBackward'){
                            //recarga el ingreso del usuario
                    userInput.push(event.target.value.toUpperCase())
                    console.log(userInput)
                    if(event.target.nextElementSibling){
                        event.target.nextElementSibling.focus()
                    }else{
                        let rightIndex = compareArray(wordArray,userInput);
                        console.log(rightIndex);
                        rightIndex.forEach(element =>{
                            squares[element].classList.add('green')
                        })
                        
                            //letra amarilla
                        let existIndexArray = existLetter(wordArray, userInput);
                        console.log(existIndexArray);
                        existIndexArray.forEach(element=>{
                            squares[element].classList.add('gold');
                        });
    
                        //si los arreglos son iguales
    
                        if(rightIndex.length == wordArray.length){
                            showResult ('Ganaste!!!');
                            return;
                        }
                            //crear una fila nueva
                        let actualRow = createRow();
                        
                        if(!actualRow){
                            return
                        }
    
                        drawSquares(actualRow);
                        listenInput(actualRow);
                        addFocus(actualRow);
                    }
                }else{
                    userInput.pop();
                }
    
        })
    })
    
    }
    
    
    
    //// FUNCIONES ////
    
    function compareArray(array1,array2){
        let iqualsIndex = [];
        array1.forEach((element, index)=>{
            if(element == array2[index]) {
                console.log(`En la posicion ${index} SI son iguales`);
                iqualsIndex.push(index);
            }else{
                console.log(`En la posicion ${index} NO son iguales`);
            }
                
        })
        return iqualsIndex
    }
    
    function existLetter(array1, array2){
        let = existIndexArray = [];
        array2.forEach((element, index) => {
            if (array1.includes(element)){
                existIndexArray.push(index)
            } 
        })
        return existIndexArray;
    }
    
    function createRow(){
        rowId++
        if(rowId <= 5){
            let newRow = document.createElement('div');
            newRow.classList.add('row');
            newRow.setAttribute('id', rowId);
            mainContainer.appendChild(newRow);
            return newRow
        }else{
            showResult(`Intentalo de nuevo! <br> La respuesta era:"${word.toUpperCase()}"`);
        }
    }
      
    function drawSquares(actualRow){
        wordArray.forEach((item, index) => {
            if(index === 0){
                actualRow.innerHTML += `<input type="text" class="square focus" maxlength="1"></input>`
            }else{
                actualRow.innerHTML += `<input type="text" class="square" maxlength="1"></input>`
            }    
        })
    }
    
    function addFocus(actualRow){
        let focusElement = actualRow.querySelector('.focus');
            focusElement.focus();
    }
    
    function showResult (textMsj){
        resultElement.innerHTML = `
        <p>${textMsj}</p> 
        <button class="button">Reiniciar</button>`
           
        let resetBtn = document.querySelector('.button');
        resetBtn.addEventListener('click', ()=>{
        location.reload();
        }); 
    }

})







