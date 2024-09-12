
const peopleContainer = document.getElementById('people-container');
const personContainer = document.getElementById('person-container');
const personHeader = document.getElementById('person-header');
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
fetchPeople();

async function getAllPages(urls){
    try {
        const promiseList = urls.map(url =>
            fetch(url)
                .then(response => response.json())
                .catch(err => console.error('Failed to fetch:',url, err))
        );
    const results = await Promise.all(promiseList);
        let finalList=[];
        results.forEach(res => {
            finalList = finalList.concat(res.results);
        });
        console.log(finalList);

        finalList.forEach(person => {
            const personElt = document.createElement('div');
            personElt.className ='person';

             const personHeader = document.createElement('h2');
            personHeader.innerHTML = person.name;
            personElt.appendChild(personHeader);
            peopleContainer.appendChild(personElt);
            personElt.addEventListener('click', async() =>{
                while (personDetails.firstChild){
                    personDetails.removeChild(personDetails.firstChild);
                }

                try {
                    const personResponse = await fetch(person.url);
                    const personData = await personResponse.json();

                
                for (const propKey in personData.result.properties){
                if ( propKey === 'name')  {
                    personHeader.innerText = personData.result.properties[propKey];
                } else{ 
                    const propItem= document.createElement('li');
                    propItem.innerText = '${propKey}: ${personData.result.properties[propKey]}';
                    personDetails.appendChild(propItem);
                }
                }          
        personContainer.hidden= false;
        window.scrollTo(0,0);
} catch (err) {
    console.error('Failed to fetch person details',err);
}
            });
        })
    } catch(err){
        console.error("failed tofetch all pages", err);
    } 
    
}
