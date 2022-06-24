function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

function fontsStyle(params) {

    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {}

// Кнопка закрывания баннера
var close = document.getElementById('close');
close.addEventListener('click', function close() {
    let banner = document.getElementById('banner');
    banner.style.display = 'none';
});

// Простой скрипт для переключения по разным кнопкам
var brands = document.getElementById('brands');
var group = document.getElementById('group');
var category = document.getElementById('category');
var popular = document.querySelector('.popular-categories');
var all_categories = document.querySelector('.all-categories');
var categories_filter = document.querySelector('.categories');
var brands_keyboard = document.querySelector('.keyboard-container');
var brands_list = document.querySelector('.brands-list-container');
var group_and_category_buttons = document.querySelector('.group-and-category-buttons');
/*
popular - display flex
all_categories - display flex
categories_filter - display block
brands_keyboard - display flex
brands_list - display flex
group etc - display flex
*/


function select1() {
    if (brands.classList.contains('selected')) {
        if ( window.innerWidth >= 576) {
            group_and_category_buttons.style.display = 'flex';
        } else {
            group_and_category_buttons.style.display = 'none';
        }
        brands_keyboard.style.display = 'none';
        brands_list.style.display = 'none';
        brands.classList.remove('selected');
        group.classList.add('selected');
        popular.style.display = '';
        all_categories.style.display = '';
    } else if (group.classList.contains('selected') || category.classList.contains('selected')) {
        if (group.classList.contains('selected')) {
            group.classList.remove('selected');
            popular.style.display = 'none';
            all_categories.style.display = 'none';
        } else {
            category.classList.remove('selected');
            categories_filter.style.display = 'none';
        }
        brands.classList.add('selected');
        brands_keyboard.style.display = '';
        brands_list.style.display = '';
        group_and_category_buttons.style.display = 'none';
    }
}

function select2() {
    if (group.classList.contains('selected')) {
        return;
    } else if (brands.classList.contains('selected') || category.classList.contains('selected')) {
        if (brands.classList.contains('selected')) {
            brands.classList.remove('selected');
            brands_keyboard.style.display = 'none';
            brands_list.style.display = 'none';
        } else {
            category.classList.remove('selected');
            categories_filter.style.display = 'none';
        }
        group.classList.add('selected');
        popular.style.display = '';
        all_categories.style.display = '';
    }
}

function select3() {
    if (category.classList.contains('selected')) {
        return;
    } else if (brands.classList.contains('selected') || group.classList.contains('selected')) {
        if (brands.classList.contains('selected')) {
            brands.classList.remove('selected');
            brands_keyboard.style.display = 'none';
            brands_list.style.display = 'none';
        } else {
            group.classList.remove('selected');
            popular.style.display = 'none';
            all_categories.style.display = 'none';
        }
        category.classList.add('selected');
        categories_filter.style.display = 'block';
    }
}

// Клик по клавише
var keys = document.querySelectorAll('.key');
for ( let i = 0; i < keys.length; i++ ) {
    keys[i].onclick = function selectKey() {
        if ( keys[i].classList.contains('selected-key') ) {
            keys[i].classList.remove('selected-key');
        } else {
            keys[i].classList.add('selected-key');
        }
    }
}

function cleanKey() {
    for ( let i = 0; i < keys.length; i++ ) {
        keys[i].classList.remove('selected-key');
    }
}

// Показать больше
function showMore() {
    let show_button = document.querySelector('.media-show-more-button');
    let categories_grid = document.querySelector('.all-categories-grid').getElementsByClassName('grid-item');
    if ( show_button.innerHTML == 'Скрыть' ) {
        show_button.innerHTML = 'Показать больше';
        for ( let i = 9; i < 16; i++ ) {
            categories_grid[i].style.display = '';
        }
    } else {
        show_button.innerHTML = 'Скрыть';
        for ( let i = 9; i < 16; i++ ) {
            categories_grid[i].style.display = 'block';
        } 
    }
}

// Переключение по группам
var most_popular = document.querySelector('.most-popular-categories-container');
var arr = []
most_popular.onclick = function(e) {
    for ( let i = 0; i < all_in_categories.children.length; i++ ) {
        all_in_categories.children[i].classList.remove('selected-category');
        arr[i] = all_in_categories.children[i].className;
    }

    for ( let i = 0; i < most_popular.children.length; i++ ) {
        most_popular.children[i].classList.remove('selected-category');
        arr[i] = most_popular.children[i].className;
    }
    for ( let i = 0; i < arr.length; i++ ) {
        if ( e.target.className == arr[i]) {
            e.target.classList.add('selected-category');
        }
        else {
            if ( e.target.parentNode.className == arr[i]) {
                e.target.parentNode.classList.add('selected-category');
            }
            else {
                if ( e.target.parentNode.parentNode.className == arr[i]) {
                    e.target.parentNode.parentNode.classList.add('selected-category');
                }
                else {
                    if ( e.target.parentNode.parentNode.parentNode.className == arr[i]) {
                        e.target.parentNode.parentNode.parentNode.classList.add('selected-category');
                    }
                    else {
                        if ( e.target.parentNode.parentNode.parentNode.parentNode.className == arr[i]) {
                            e.target.parentNode.parentNode.parentNode.parentNode.classList.add('selected-category');
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
    }

    // Переключение на разный контент в правом блоке вкладки "По категориям"
    if ( document.querySelector('.selected-category').classList.contains('first-type') ) {
        document.querySelector('.first-type-of-categories-container').style.display = 'block';
        document.querySelector('.second-type-of-categories-container').style.display = 'none';
    } else if ( document.querySelector('.selected-category').classList.contains('second-type') ) {
        document.querySelector('.first-type-of-categories-container').style.display = 'none';
        document.querySelector('.second-type-of-categories-container').style.display = 'block';
    }
}

var all_in_categories = document.querySelector('#in_categories');
var arr = []
all_in_categories.onclick = function(e) {
    for ( let i = 0; i < most_popular.children.length; i++ ) {
        most_popular.children[i].classList.remove('selected-category');
        arr[i] = most_popular.children[i].className;
    }

    for ( let i = 0; i < all_in_categories.children.length; i++ ) {
        all_in_categories.children[i].classList.remove('selected-category');
        arr[i] = all_in_categories.children[i].className;
    }
    for ( let i = 0; i < arr.length; i++ ) {
        if ( e.target.className == arr[i]) {
            e.target.classList.add('selected-category');
        }
        else {
            if ( e.target.parentNode.className == arr[i]) {
                e.target.parentNode.classList.add('selected-category');
            }
            else {
                if ( e.target.parentNode.parentNode.className == arr[i]) {
                    e.target.parentNode.parentNode.classList.add('selected-category');
                }
                else {
                    if ( e.target.parentNode.parentNode.parentNode.className == arr[i]) {
                        e.target.parentNode.parentNode.parentNode.classList.add('selected-category');
                    }
                    else {
                        if ( e.target.parentNode.parentNode.parentNode.parentNode.className == arr[i]) {
                            e.target.parentNode.parentNode.parentNode.parentNode.classList.add('selected-category');
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
    }

    // Переключение на разный контент в правом блоке вкладки "По категориям"
    if ( document.querySelector('.selected-category').classList.contains('first-type') ) {
        document.querySelector('.first-type-of-categories-container').style.display = 'block';
        document.querySelector('.second-type-of-categories-container').style.display = 'none';
    } else if ( document.querySelector('.selected-category').classList.contains('second-type') ) {
        document.querySelector('.first-type-of-categories-container').style.display = 'none';
        document.querySelector('.second-type-of-categories-container').style.display = 'block';
    }
}

// @media
const dropdownmedia = window.matchMedia('(max-width: 992px)');

function changeTrack(e) {
    if (e.matches) {
        document.querySelector('.bottom-header-dropdown-text').innerHTML = 'Ещё';
    }
}

dropdownmedia.addListener(changeTrack);
changeTrack(dropdownmedia);

const banner = window.matchMedia('(max-width: 768px)');

window.onload = function() {
    if (banner.matches) {
        document.querySelector('.main-banner-webp').srcset = "img/main-banner-low-res.webp";
        document.querySelector('.main-banner-img').src = "img/main-banner-low-res.jpg";
    }
}

function changeBanner(e) {
    if (e.matches) {
        document.querySelector('.main-banner-webp').srcset = "img/main-banner-low-res.webp";
        document.querySelector('.main-banner-img').src = "img/main-banner-low-res.jpg";
    }
}

banner.addListener(changeBanner);
changeTrack(banner);

// Поиск в шапке документа
const search = window.matchMedia('(max-width: 556px)');

window.onload = function() {
    if (search.matches) {
        let search_input = document.querySelector('.search-input');
        let search_container = document.querySelector('.search-container');
        let bottom_header = document.querySelector('.bottom-header-container');
        search_input.classList.add('media-hide');
        document.querySelector('.search-button').addEventListener('click', function() {
            let nav = document.querySelector('.bottom-header-nav');
            if ( search_input.classList.contains('media-hide') && search.matches ) {
                search_input.classList.remove('media-hide');
                search_container.style.width = '100%';
                bottom_header.classList.add('to-search');

                nav.classList.add('media-hide');
            } else {
                search_input.classList.add('media-hide');
                search_container.style.width = '50%';
                bottom_header.classList.remove('to-search');

                nav.classList.remove('media-hide');
            }
        });
    } else {

    }
}

function spawnSearch(e) {
    if (e.matches) {
        let search_input = document.querySelector('.search-input');
        let search_container = document.querySelector('.search-container');
        let bottom_header = document.querySelector('.bottom-header-container');
        search_input.classList.add('media-hide');
        document.querySelector('.search-button').addEventListener('click', function() {
            let nav = document.querySelector('.bottom-header-nav');
            if ( search_input.classList.contains('media-hide') && e.matches ) {
                search_input.classList.remove('media-hide');
                search_container.style.width = '100%';
                bottom_header.classList.add('to-search');

                nav.classList.add('media-hide');
            } else {
                search_input.classList.add('media-hide');
                search_container.style.width = '50%';
                bottom_header.classList.remove('to-search');

                nav.classList.remove('media-hide');
            }
        });
    } else {

    }
}

search.addListener(spawnSearch);
spawnSearch(search);

// Выпадающие списки
document.querySelector('.top-header-dropdown').addEventListener('click', function() {
    let dropdown = document.querySelector('.top-header-dropdown-items-container');
    if ( dropdown.style.display == 'block' ) {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});

document.querySelector('.header-call-dropdown').addEventListener('click', function() {
    let dropdown = document.querySelector('.header-call-dropdown-items-container');
    if ( dropdown.style.display == 'block' ) {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});

document.querySelector('.first-bottom-call-dropdown').addEventListener('click', function() {
    let dropdown = document.querySelector('.first-bottom-call-dropdown-items-container');
    if ( dropdown.style.display == 'block' ) {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});

document.querySelector('.second-bottom-call-dropdown').addEventListener('click', function() {
    let dropdown = document.querySelector('.second-bottom-call-dropdown-items-container');
    if ( dropdown.style.display == 'block' ) {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});

function header_burger_dropdown() {
    let dropdown = document.querySelector('.top-header-burger-dropdown'); 
    if ( document.querySelector('.top-header-burger-dropdown').classList.contains('selected-burger') ) {
        document.querySelector('.top-header-burger-dropdown').classList.remove('selected-burger');
    } else {
        document.querySelector('.top-header-burger-dropdown').classList.add('selected-burger');
    }
    let header_burger_dropdown = document.querySelector('.top-header-burger-dropdown-container');
    if ( header_burger_dropdown.style.display == 'none' ) {
        header_burger_dropdown.style.display = 'flex';
    } else {
        header_burger_dropdown.style.display = 'none';
    }
}

function b_dropdown() {
    let b_dropdown = document.querySelector('.bottom-header-dropdown-items-container');
    if ( b_dropdown.style.display == 'none' ) {
        b_dropdown.style.display = 'block';
    } else {
        b_dropdown.style.display = 'none';
    }
}