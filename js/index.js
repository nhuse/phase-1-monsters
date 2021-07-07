let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    parseMonsterData(currentPage);
    document.querySelector('#back').addEventListener('click', () => {
        previousPage();
    })
    document.querySelector('#forward').addEventListener('click', () => {
        nextPage();
    })
})

function parseMonsterData(page) {
    document.querySelector('#monster-container').innerHTML = '';
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(json => json.forEach(element => createMosterLi(element)))
}

function createMosterLi(monster) {
    console.log(monster)
    if(document.querySelector('.error')){
        document.querySelector('.error').remove();
    }
    let monsterList = document.createElement('ul');
    let li = document.createElement('li');
    let divContainer = document.createElement('div');
    let h1Name = document.createElement('h1');
    let h4Desc = document.createElement('h4');
    let h4Age = document.createElement('h4');
    let h4Id = document.createElement('h4');

    monsterList.style.listStyleType = 'none';

    monsterList.className = 'monster-list';
    li.className = 'monster-li';
    divContainer.className = 'monster-info-div';
    h1Name.className = 'monster-name';
    h4Desc.className = 'monster-description';
    h4Age.className = 'monster-age';
    h4Id.className = 'monster-id';

    h1Name.textContent = `Monster Name: ${monster.name}`;
    h4Desc.textContent = `Description: ${monster.description}`;
    h4Age.textContent = `${Math.floor(monster.age)} years old`;
    h4Id.textContent = `ID: ${monster.id}`;

    divContainer.append(h1Name, h4Desc, h4Age, h4Id);
    li.append(divContainer);
    monsterList.append(li);
    document.querySelector('#monster-container').append(monsterList);
}

function nextPage() {
    if(currentPage+1 >= 22){
        currentPage = 22;
        let list = document.querySelector('.monster-list');
        list.innerHTML = '';
        let error = document.createElement('h1');
        error.className = 'error';
        error.textContent = 'Error: You are on the last page. Please go to the previous page.';
        document.body.append(error);
    } else {
        currentPage++
        parseMonsterData(currentPage);
    }
}

function previousPage() {
    if(currentPage-1 <= 0) {
        currentPage = 0;
        let list = document.querySelector('#monster-container');
        list.innerHTML = '';
        let error = document.createElement('h1');
        error.className = 'error';
        error.textContent = 'Error: You are on the first page. Please go to the next page.';
        document.body.append(error);
    } else{
        currentPage--;
        parseMonsterData(currentPage);
    }
}