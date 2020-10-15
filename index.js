const button = document.querySelector('#button')
const display = document.querySelector('#display')
const addButton = document.querySelector('#add-fact')
const viewButton = document.querySelector('#view-fact')
const factsCount = document.querySelector('#num-facts')
const savedFacts = document.querySelector('#saved-ul')
const deleteButton = document.querySelector('#delete-button')
const removeFact = document.querySelector('#remove')
let storage = window.localStorage

// checking local storage (saved facts)
factsCount.innerHTML = storage.length
if(storage.length != 0){
    for(let i=0; i<window.localStorage.length; i++){
        savedFacts.innerHTML += "<li id="+i+"><i class='fas fa-minus-circle' id='remove'></i> " + storage.getItem(i) + "</li>"
    }
}

// generate new random fact 
button.addEventListener('click', async ()=>{

    const URL = "https://uselessfacts.jsph.pl/random.json?language=en"
    const response = await fetch(URL)

    if(!response.status == 200){
        display.innerHTML = "Network Error ! can't pull Facts."
    }else{
        const data = await response.json()
        addButton.style.display = "block"
        display.innerHTML = data.text
    }
})

// add fact to list/localStorage
addButton.addEventListener('click', ()=>{
    // saving data to ls
    storage.setItem(storage.length, display.innerHTML)
    factsCount.innerHTML = storage.length

    // displaying data into the right panel
    savedFacts.innerHTML = ""
    for(let i=0; i<storage.length; i++){
        savedFacts.innerHTML += "<li id="+i+"><i class='fas fa-minus-circle' id='remove'></i> " + storage.getItem(i) + "</li>"
    }
})

// clearing all facts/localStorage
deleteButton.addEventListener('click', ()=>{
    // clearing localStorage
    storage.clear();
    // clearing saved facts from the panel
    savedFacts.innerHTML = ""
    for(let i=0; i<storage.length; i++){
        savedFacts.innerHTML += "<li id="+i+"><i class='fas fa-minus-circle' id='remove'></i> " + storage.getItem(i) + "</li>"
    }
    // resetting the numFacts
    factsCount.innerHTML = storage.length
})

// removing one fact from the list/localStorage
document.addEventListener('click', (e)=>{
    if (e.target && e.target.id == "remove") {
        // removing the 'fact' from the list
        e.target.parentElement.remove()
        // deleting the fact from localStroge
        storage.removeItem(e.target.parentElement.id)
        // resetting the numFacts
        factsCount.innerHTML = storage.length
    }
})