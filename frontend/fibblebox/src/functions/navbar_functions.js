const toggleHambugerBtn = ()=>{
    //here we get the icons DOM we will be working with
    let mobile_nav_btn_open = document.querySelector('#mobile-nav-btn-open');
    let mobile_nav_btn_close = document.querySelector('#mobile-nav-btn-close');
    //this condtion here toggle between different icon in the nav bar
    if(mobile_nav_btn_open.className != 'no-display'){
      mobile_nav_btn_open.className = 'no-display'
      mobile_nav_btn_close.className = "icon-3 nav-bar-btn-animation"
        
    }
    else{
      mobile_nav_btn_open.className="icon-3 nav-bar-btn-animation"
      mobile_nav_btn_close.className="no-display"

    }
}

const toggleSideBar = ()=>{
    let mobile_side_bar = document.querySelector('#mobile-side-bar');
    let menu_search_btn = document.querySelector('#menu-search-btn');
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
    }

// this toggle between search page visibility
const toggleSearchSection= ()=>{
    let search_page = document.querySelector('#search-page');
    //this make search page visible if it is not visible
    if(search_page.classList.contains('no-display')){
        search_page.classList.replace('no-display','search-section')
        search_page.classList.add('no-display-max')
    }
    //then this would hide it if it is visible note animation are applied
    else{
        search_page.classList.replace('search-section','search-section-close')
        search_page.classList.remove('no-display-max')
        setTimeout(()=>{
            search_page.classList.replace('search-section-close','no-display')
         },80)

    }
}
export {toggleHambugerBtn, toggleSideBar, toggleSearchSection}