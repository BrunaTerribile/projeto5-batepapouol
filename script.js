//variáveis globais

function login() {
    const enter = document.querySelector('.home-screen');
    enter.classList.add('home-off');
}
  
function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList. toggle('sidebar-on');
}

function selectContact(classContact){  
    const selectOne = document.querySelector('.contact-name .check .selecionado');
        
    if (selectOne !== null){
        selectOne.classList.remove('selecionado');
    }
    
    const selected = ('.' + classContact) + ' .check';
    selected.classList.add('selecionado');

 
function selectVisibility(classVisible){
    const selectOne = document.querySelector('.option .selecionado');
        
    if (selectOne !== null){
        selectOne.classList.remove('selecionado');
    }

    const selected = ('.' + classVisible) + ' .check';
    selected.classList.add('selecionado');
}

// comentário