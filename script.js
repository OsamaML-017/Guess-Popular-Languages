const draggable_list = document.getElementById('draggable-list');
const check= document.getElementById('check');

const planguages=[
    'JavaScript',
    'Python',
    'C/C++',
    'Java',
    'R Language',
    'Kotlin',
    'C#',
    'PHP',
    'Go',
    'scala'
];


const listItems=[];
let startIndex;
let endIndex;
InsertList();
function InsertList(){
    [...planguages]
    .map(a => ({value:a,sort:Math.random()}))
    .sort((a,b)=>a.sort-b.sort)
    .map(a=>a.value)
    .forEach((lang,index)=>{
       
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index',index);
        listItem.innerHTML=`
            <span class='number'>${index+1}</span> 
            <div class='draggable' draggable="true">
            <p class='lang-name'>${lang}</p> 
            <i class='fas fa-grip-lines'></i>
            </div>
        `;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
        
    });
addEventListeners();
}
function dragStart(){
    // console.log('Event: ', 'dragstart');
    startIndex=this.closest('li').getAttribute('data-index');
    // console.log(startIndex)
}
function dragDrop(){
    // console.log('Event: ', 'drop');
    endIndex=this.closest('li').getAttribute('data-index');
    
    swapIndex(startIndex,endIndex);
    this.classList.remove('over')
}
swapIndex=(si,ei)=>{
    let temp1=listItems[si].querySelector('.draggable')
    let temp2=listItems[ei].querySelector('.draggable')
    
    listItems[si].appendChild(temp2)
    listItems[ei].appendChild(temp1)
}


function dragEnter(){
    this.classList.add('over')
}
function dragOver(e){
    e.preventDefault()
}
function dragLeave(){
    this.classList.remove('over')
}

function checkOrder(){
    listItems.forEach((listItem,index)=>{
        const language=listItem.querySelector('.draggable').innerText.trim();
        if(language !== planguages[index]){
            listItem.querySelector('.draggable .lang-name').classList.add('red');
        }else{
            listItem.querySelector('.draggable .lang-name').classList.remove('red');
            listItem.querySelector('.draggable .lang-name').classList.add('green');
        }
    })
}
function addEventListeners(){
    const draggables =document.querySelectorAll('.draggable')
    const dragListItems =document.querySelectorAll('.draggable-list li')
    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart',dragStart);
        dragListItems.forEach(item=>{
            item.addEventListener('dragover',dragOver);
            item.addEventListener('drop',dragDrop);
            item.addEventListener('dragenter',dragEnter);
            item.addEventListener('dragleave',dragLeave);
        }
        )   
    });
}

check.addEventListener('click',checkOrder)