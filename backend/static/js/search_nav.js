

// this would perform a task(function) when the search icon is clicked
menu_search_btn.addEventListener("click",()=>{
    toggleSearchIcon(search_page)
});

// this toggle between search page visibility
function toggleSearchIcon(search){
    //this make search page visible if it is not visible
    if(search.classList.contains('no-display')){
        search.classList.replace('no-display','search-section')
        search.classList.add('no-display-max')
    }
    //then this would hide it if it is visible note animation are applied
    else{
        search.classList.replace('search-section','search-section-close')
        search.classList.remove('no-display-max')
        setTimeout(()=>{
            search.classList.replace('search-section-close','no-display')
         },80)
    };
};