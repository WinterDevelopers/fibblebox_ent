//this script is for the functionality of the side bar
let mobile_side_bar = document.querySelector('#mobile-side-bar');
let mobile_nav_btn_open = document.querySelector('#mobile-nav-btn-open');
let mobile_nav_btn_close = document.querySelector('#mobile-nav-btn-close');
let menu_search_btn = document.querySelector('#menu-search-btn');

mobile_nav_btn_open.addEventListener("click",()=>{
    toggleSideBar();
    replaceMenuIcon();
});

mobile_nav_btn_close.addEventListener("click", ()=>{
    toggleSideBar();
    replaceMenuIcon();
});

function toggleSideBar(){
    //this here would show the nav bar if it is hidden 
    if(mobile_side_bar.classList.contains('no-display')){
        menu_search_btn.className = "no-display"
        mobile_side_bar.classList.replace('no-display','mobile-side-bar')
        mobile_side_bar.classList.add('no-display-max')
    }
    //this would hide the nav bar if it is not hidden when clicked
    else{
        menu_search_btn.className = "search-mobile no-display-max"
        mobile_side_bar.classList.replace('mobile-side-bar','mobile-side-bar-close')
        mobile_side_bar.classList.remove('no-display-max')
        setTimeout(()=>{
           mobile_side_bar.classList.replace('mobile-side-bar-close','no-display')
        },80)
        //mobile_side_bar.classList.replace('no-display-max','no-display')
    };
};
function replaceMenuIcon(){
    if(mobile_nav_btn_open.className !== 'no-display'){
        mobile_nav_btn_open.className = 'no-display'
        mobile_nav_btn_close.className = "icon-3 nav-bar-btn-animation"
    }
    else{
        mobile_nav_btn_open.className="icon-3 nav-bar-btn-animation"
        mobile_nav_btn_close.className="no-display"
    };
};

//for the fuctions we will be needing somewhere else we will be exporting them
export const menu_icon = replaceMenuIcon