const button = document.querySelector('#button')
const display = document.querySelector('#display')
const addButton = document.querySelector('#add-fact')
const viewButton = document.querySelector('#view-fact')
const factsCount = document.querySelector('#num-facts')
const savedFacts = document.querySelector('#saved-ul')
let storage = window.localStorage

// checking local storage (saved facts)
factsCount.innerHTML = storage.length
if(storage.length != 0){
    for(let i=0; i<window.localStorage.length; i++){
        savedFacts.innerHTML += "<li>" + storage.getItem(i) + "</li>"
    }
}

// Getting facts
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

addButton.addEventListener('click', ()=>{
    // saving data to ls
    storage.setItem(storage.length, display.innerHTML)
    factsCount.innerHTML = storage.length

    // displaying data into the right panel
    savedFacts.innerHTML = ""
    for(let i=0; i<storage.length; i++){
        savedFacts.innerHTML += "<li>" + storage.getItem(i) + "</li>"
    }
})






