let current = 'home';
const pages = ['home', 'about', 'contact', 'recommendations'];

const showPages = () =>{
    const all = document.getElementsByClassName("page");
    console.log('showPages', all);
    for (const page of all) {
        if (page.id === current) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    }
}

const navigateTo = (p) => {current = p; console.log('page changed', p); showPages()}

document.getElementById('homeBtn').addEventListener("click", () => navigateTo('home'));
document.getElementById('aboutBtn').addEventListener("click", () => navigateTo('about'));
document.getElementById('contactBtn').addEventListener("click", () => navigateTo('contact'));
document.getElementById('btnSearch').addEventListener("click", () => {
    navigateTo('recommendations');
});


showPages();