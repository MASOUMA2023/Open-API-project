
const peopleContainer = document.getElementById('people-container');
const personContainer = document.getElementById('person-container');
/*const personHeader = document.getElementById('person-header');*/
const personDetails = document.getElementById('person-details');
const doneButton = document.getElementById('done');

personContainer.hidden = true;

async function fetchPeople(){
    try{
        const response = await fetch("https://www.swapi.tech/api/people");
        if (!response.ok){
            throw new Error('failed!');
        }
let data = await response.json();
console.log(data);
const dataLength = data.total_pages;
console.log('fetch successfull:', dataLength);

const baseUrl = "https://www.swapi.tech/api/people?page=";
const urls = [];
for ( let i = 1; i<= dataLength; i++){
    urls.push(`${baseUrl}${i}&limit=10`);
}

 await getAllPages(urls);
    } catch(err){
        console.error(err);
    }
}

async function getAllPages(urls){
    try{
        const promiseList = urls.map(url =>
            fetch(url)
                .then(response => response.json())
                .catch(err => console.log('Failed to fetch:', err)));
    const finalResults = await Promise.all(promiseList);
   
        let finalList=[];
       finalResults.forEach(res => {
            finalList = finalList.concat(res.results);
        });
        console.log(finalList);
        displayPeople(finalList);
    } catch(err){
        console.erroe(err);
    }
}
  function displayPeople(people){
people.forEach(person => {
            const personElt = document.createElement('div');
            personElt.className ='person';

             const personHeader = document.createElement('h2');
            personHeader.innerHTML = person.name;
            personElt.appendChild(personHeader);
            peopleContainer.appendChild(personElt);

            personElt.addEventListener('click', () =>{
              displayPersonDetails(person.url);
            });
        });
    }
async function displayPersonDetails(personURL){
while (personDetails.firstChild){
    personDetails.removeChild(personDetails.firstChild);
}
    try {

const response = await fetch(personURL);
                if (!response.ok){
                    throw new Error('error fetching person details!');
                } 
               const personData = await response.json();
                for (let propKey in personData.result.properties){
                if ( propKey === 'homeworld' || propKey === 'url')  {
                    continue;}
                    const propItem= document.createElement('li');
                    propItem.innerText = '${propKey}: ${personData.result.properties[propKey]}';
                    personDetails.appendChild(propItem);
                }
                  
        personContainer.hidden= false;
        window.scrollTo(0,0);
} catch (err) {
    console.log('Failed to fetch person details',err);

    }
    } 
doneButton.addEventListener('click', () =>{
    personContainer.hidden =true;
});
fetchPeople();
    

