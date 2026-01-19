let current = 'home';
const pages = ['home', 'about', 'contact', ];

const loaded =() => {
    console.log('Loaded');
    showPages();
    
    document.getElementById('homeBtn').addEventListener("click", () => navigateTo('home'));
    document.getElementById('aboutBtn').addEventListener("click", () => navigateTo('about'));
    document.getElementById('contactBtn').addEventListener("click", () => navigateTo('contact'));
    
    document.getElementById('btnSearch').addEventListener("click", onSearch);
    document.getElementById('btnClear').addEventListener("click", onResetKeyword);
}



const showPages = () =>{
    const all = document.getElementsByClassName("page");
    for (const page of all) {
        if (page.id === current) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    }

    const searchBar = document.getElementById("search_bar");
    searchBar.style.visibility = current === 'home' ? 'visible' : 'hidden';
}

const navigateTo = (p) => {current = p; console.log('page changed', p); showPages()}



const onSearch = () =>{ 
    const keyword = document.getElementById('destinationInput').value.trim();

    const allowed = ['beach', 'beaches','temple','temples','country','countries'];
    const validKeyword = allowed.map( kw => keyword.toLowerCase().includes(kw)).reduce((a,b) => a||b, false);

    const usedKeyword = !validKeyword ? '' : 
        keyword.includes('beach') ? 'beaches' :
        keyword.includes('temple') ? 'temples' :
        keyword.includes('countr') ? 'countries' : '';


    const toElement = (item) => {

        const s = `<div style="width:90%;background-color:navy;border-radius:10px;overflow:hidden;margin:auto;margin-bottom:20px;">
        <div style="background-color:blue;height:20px;">&nbsp;</div>
        <img src="${item.imageUrl}" style="width:100%" alt="${item.name}" />
        <div style="background-color:white;padding:6px">
            <h3 style="color:black;filter:none;font-size:12px;filter:none">${item.name}</h3}<br/>
            <p style="color:black;filter:none;font-size:10px;filter:none">${item.description}</p>
            <br/>
            <button>Visit</button>
        </div>
        </div>
        `;
        return s;

    }

    const ctrlRec = document.getElementById('recos');
    //
    if (usedKeyword){
        fetch('./travel_recommendation_api.json').then( r => r.json()).then( data => {
            console.log('loaded data', data, 'used', usedKeyword);
    
            const d = usedKeyword === 'countries' ?  data[usedKeyword].map( c => c.cities).flat() : data[usedKeyword];
            if (d.length > 2) {
                d.sort( (a,b) => Math.random() > 0.5)
                d.length = 2;
            }
            const list = d.map(toElement).join('');

            
    
            console.log('adding list', list);
            ctrlRec.innerHTML = list;
        })
    } else {
        ctrlRec.innerHTML = 'No results, try beach / country / temple ';
    }
    
}
const onResetKeyword = () =>{
    const ctrl = document.getElementById('destinationInput');
    ctrl.value = '';
}

const onSubmitted = (e)=>{
    e.preventDefault();

    const fields = e.target;
    const name = fields[0].value;
    const email = fields[1].value;
    const message = fields[2].value;
    
    if (confirm(`Thanks for reaching out ${name}! We will send a message to ${email}, to answer your message: \n\n ${message}`)){
        //reset
        for (const c of fields) c.value = '';
    }
    console.log("just submitted", e, e.form, Object.keys(e));

    
}


var form = document.getElementById("contactform");

form.addEventListener("submit", onSubmitted, true);


