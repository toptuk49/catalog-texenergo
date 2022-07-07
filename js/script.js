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

const select1media = window.matchMedia('(max-width: 320px)');
const select1media2 = window.matchMedia('(max-width: 320px)');

brands.addEventListener('click', function select1(e) {
    group_and_category_buttons.style.display = 'none';
    if (brands.classList.contains('selected')) {
        if ( window.innerWidth > 329) {
            group_and_category_buttons.style.display = 'flex';
        }
        brands_keyboard.style.display = 'none';
        brands_list.style.display = 'none';
        brands.classList.remove('selected');
        group.classList.add('selected');
    } else if (group.classList.contains('selected') || category.classList.contains('selected')) {
        if (group.classList.contains('selected')) {
            group.classList.remove('selected');
        } else {
            category.classList.remove('selected');
        }
        brands.classList.add('selected');
        brands_keyboard.style.display = '';
        brands_list.style.display = '';
    }
});

function select_media(e) {
    if (e.matches) {
        group_and_category_buttons.style.display = 'none';
    } else {
        group_and_category_buttons.style.display = 'flex';
    }
}

select1media.addListener(select_media);
select_media(select1media);

group.addEventListener('click', function select2() {
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
});

category.addEventListener('click', function select3() {
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
});

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

const sortmedia = window.matchMedia('(max-width: 810px)');
var sort_container = document.querySelector('.brands-sort-container');
var sort_count = document.querySelector('.brands-sort');
function sort_media(e) {
    document.querySelector('.apply-button').addEventListener('click', function sort() {
        let checkboxes = document.querySelectorAll('.brands-list-checkbox:checked');
        let c = checkboxes.length;
        sort_count.innerHTML = 'Отобрано брендов: ' + c;
        brands.addEventListener('click', function() {
            if ( c > 0 && ( sort_container.style.display == '' || sort_container.style.display == 'none' ) && !brands.classList.contains('selected') ) {
                sort_container.style.display = 'flex';
            } else {
                if ( brands.classList.contains('selected') ) {
                    sort_container.style.display = 'none';
                }
            }
        });
    });

    if (e.matches) {
        sort_container.style.flexDirection = 'column';
    } else {
        sort_container.style.flexDirection = 'row';
    }
}

sortmedia.addListener(sort_media);
sort_media(sortmedia);


document.querySelector('.clean-button').addEventListener('click', function cleanKey() {
    for ( let i = 0; i < keys.length; i++ ) {
        keys[i].classList.remove('selected-key');
    }

    // Снятие галочек с выбранных чекбоксов
    let checkboxes = document.getElementsByClassName('brands-list-checkbox');
    for ( let i = 0; i < checkboxes.length; i++ ) {
        checkboxes[i].checked = false;
    }
    brands.addEventListener('click', function() {
        if ( !brands.classList.contains('selected') ) {
            sort_container.style.display = 'none';
        }
    });
    sort_count.innerHTML = '';
});

document.querySelector('.sort-clean-button').addEventListener('click', function() {
    let checkboxes = document.getElementsByClassName('brands-list-checkbox');
    for ( let i = 0; i < checkboxes.length; i++ ) {
        checkboxes[i].checked = false;
    }
    sort_container.style.display = 'none';
    sort_count.innerHTML = '';
});

// Показать больше
document.querySelector('.media-show-more-button').addEventListener('click', function() {
    let show_button = document.querySelector('.media-show-more-button');
    let categories_grid = document.querySelector('.all-categories-grid').getElementsByClassName('grid-item');
    for ( let i = 9; i < 16; i++ ) {
        categories_grid[i].style.display = 'block';
    }
    document.querySelector('.media-show-more-button-container').parentNode.removeChild(document.querySelector('.media-show-more-button-container'));
}); 

// Переключение по группам
var most_popular = document.querySelector('.most-popular-categories-container');
var most_popular_items = document.getElementsByClassName('most-popular-categories');
var arr = []
var right_categories = document.getElementsByClassName('second-type-of-categories-container');
most_popular.onclick = function(e) {
    for ( let i = 0; i < all_in_categories.children.length; i++ ) {
        arr[i] = all_in_categories.children[i].className;
    }

    for ( let i = 0; i < most_popular.children.length; i++ ) {
        arr[i] = most_popular.children[i].className;
    }

    for ( let i = 0; i < arr.length; i++ ) {
        if ( e.target.className == arr[i] && e.target.className != "left-container-header" ) {
            for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                all_in_categories.children[i].classList.remove('selected-category');
            }
        
            for ( let i = 0; i < most_popular.children.length; i++ ) {
                most_popular.children[i].classList.remove('selected-category');
            }
            e.target.classList.add('selected-category');
        } else {
            if ( e.target.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                    all_in_categories.children[i].classList.remove('selected-category');
                }
            
                for ( let i = 0; i < most_popular.children.length; i++ ) {
                    most_popular.children[i].classList.remove('selected-category');
                }
                e.target.parentNode.classList.add('selected-category');
            }
            else {
                if ( e.target.parentNode.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                    for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                        all_in_categories.children[i].classList.remove('selected-category');
                    }
                
                    for ( let i = 0; i < most_popular.children.length; i++ ) {
                        most_popular.children[i].classList.remove('selected-category');
                    }
                    e.target.parentNode.parentNode.classList.add('selected-category');
                }
                else {
                    if ( e.target.parentNode.parentNode.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                        for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                            all_in_categories.children[i].classList.remove('selected-category');
                        }
                    
                        for ( let i = 0; i < most_popular.children.length; i++ ) {
                            most_popular.children[i].classList.remove('selected-category');
                        }
                        e.target.parentNode.parentNode.parentNode.classList.add('selected-category');
                    }
                    else {
                        if ( e.target.parentNode.parentNode.parentNode.parentNode.className == arr[i] && e.target.className != "left-container-header") {
                            for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                                all_in_categories.children[i].classList.remove('selected-category');
                            }
                        
                            for ( let i = 0; i < most_popular.children.length; i++ ) {
                                most_popular.children[i].classList.remove('selected-category');
                            }
                            e.target.parentNode.parentNode.parentNode.parentNode.classList.add('selected-category');
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
    }
    
    for ( let i = 0; i < right_categories.length; i++ ) {
        if ( right_categories[i].style.display == '' && e.target.classList.contains('selected-category') ) {
            right_categories[i].style.display = 'none';
        } else {
            if ( right_categories[i].style.display == '' && e.target.parentNode.classList.contains('selected-category') ) {
                right_categories[i].style.display = 'none';
            }
            else {
                if ( right_categories[i].style.display == '' && e.target.parentNode.parentNode.classList.contains('selected-category')) {
                    right_categories[i].style.display = 'none';
                }
                else {
                    if ( right_categories[i].style.display == '' && e.target.parentNode.parentNode.parentNode.classList.contains('selected-category') ) {
                        right_categories[i].style.display = 'none';
                    }
                    else {
                        if ( right_categories[i].style.display == '' && e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('selected-category') ) {
                            right_categories[i].style.display = 'none';
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < most_popular_items.length; i++ ) {
        if ( most_popular_items[i].classList.contains('selected-category') ) {
            right_categories[i].style.display = '';
        }
    }
}

var all_in_categories = document.querySelector('#in_categories');
var all_in_categories_items = document.getElementsByClassName('all-categories-item');
var arr = []
all_in_categories.onclick = function(e) {
    for ( let i = 0; i < most_popular.children.length; i++ ) {
        arr[i] = most_popular.children[i].className;
    }

    for ( let i = 0; i < all_in_categories.children.length; i++ ) {
        arr[i] = all_in_categories.children[i].className;
    }

    for ( let i = 0; i < arr.length; i++ ) {
        if ( e.target.className == arr[i] && e.target.className != "left-container-header" ) {
            for ( let i = 0; i < most_popular.children.length; i++ ) {
                most_popular.children[i].classList.remove('selected-category');
            }
            
            for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                all_in_categories.children[i].classList.remove('selected-category');
            }
            e.target.classList.add('selected-category');
        }
        else {
            if ( e.target.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                for ( let i = 0; i < most_popular.children.length; i++ ) {
                    most_popular.children[i].classList.remove('selected-category');
                }
                
                for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                    all_in_categories.children[i].classList.remove('selected-category');
                }
                e.target.parentNode.classList.add('selected-category');
            }
            else {
                if ( e.target.parentNode.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                    for ( let i = 0; i < most_popular.children.length; i++ ) {
                        most_popular.children[i].classList.remove('selected-category');
                    }
                    
                    for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                        all_in_categories.children[i].classList.remove('selected-category');
                    }
                    e.target.parentNode.parentNode.classList.add('selected-category');
                }
                else {
                    if ( e.target.parentNode.parentNode.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                        for ( let i = 0; i < most_popular.children.length; i++ ) {
                            most_popular.children[i].classList.remove('selected-category');
                        }
                        
                        for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                            all_in_categories.children[i].classList.remove('selected-category');
                        }
                        e.target.parentNode.parentNode.parentNode.classList.add('selected-category');
                    }
                    else {
                        if ( e.target.parentNode.parentNode.parentNode.parentNode.className == arr[i] && e.target.className != "left-container-header" ) {
                            for ( let i = 0; i < most_popular.children.length; i++ ) {
                                most_popular.children[i].classList.remove('selected-category');
                            }
                            
                            for ( let i = 0; i < all_in_categories.children.length; i++ ) {
                                all_in_categories.children[i].classList.remove('selected-category');
                            }
                            e.target.parentNode.parentNode.parentNode.parentNode.classList.add('selected-category');
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
    }

    for ( let i = 0; i < right_categories.length; i++ ) {
        if ( right_categories[i].style.display == '' && e.target.classList.contains('selected-category') ) {
            right_categories[i].style.display = 'none';
        } else {
            if ( right_categories[i].style.display == '' && e.target.parentNode.classList.contains('selected-category') ) {
                right_categories[i].style.display = 'none';
            }
            else {
                if ( right_categories[i].style.display == '' && e.target.parentNode.parentNode.classList.contains('selected-category')) {
                    right_categories[i].style.display = 'none';
                }
                else {
                    if ( right_categories[i].style.display == '' && e.target.parentNode.parentNode.parentNode.classList.contains('selected-category') ) {
                        right_categories[i].style.display = 'none';
                    }
                    else {
                        if ( right_categories[i].style.display == '' && e.target.parentNode.parentNode.parentNode.parentNode.classList.contains('selected-category') ) {
                            right_categories[i].style.display = 'none';
                        }
                        else {
                            
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < all_in_categories_items.length; i++ ) {
        if ( all_in_categories_items[i].classList.contains('selected-category') ) {
            right_categories[i + most_popular_items.length].style.display = '';
        }
    }
}

// Выпадающие списки в выпадающих списках в контейнере справа
let right = document.querySelector('#right');
let arrow = document.querySelectorAll('.dropdown-icon');
for ( let i = 0; i < arrow.length; i++ ) {
    let this_arrow = arrow[i];
    let top_dropdown = this_arrow.parentNode.parentNode.parentNode;
    let container = top_dropdown.parentNode;
    let sub_menu = this_arrow.parentNode.nextElementSibling;
    this_arrow.addEventListener('click', function() {
        if ( sub_menu ) {
            if ( !sub_menu.classList.contains('opened') ) {
                sub_menu.classList.add('opened');
            }
        }

        if ( !top_dropdown.classList.contains('only') ) {
            top_dropdown.classList.add('only');
        }

        let dropdowns = container.querySelectorAll('.categories-dropdown');
        let sub_menus = [];
        if ( top_dropdown.classList.contains('only') ) {
            for ( let a = 0; a < dropdowns.length; a++ ) {
                if ( !dropdowns[a].classList.contains('only') ) {
                    dropdowns[a].style.display = "none";
                } else {
                    let close_dropdown_items = dropdowns[a].querySelectorAll('.categories-dropdown-text');
                    for ( let b = 0; b < close_dropdown_items.length; b++ ) {
                        let dropdown_to_click = close_dropdown_items[b].parentNode.parentNode.parentNode;
                        close_dropdown_items[b].addEventListener('click', function closeAll() {
                            dropdown_to_click.classList.remove('unselected');

                            let else_dropdowns_to_close_items = dropdown_to_click.querySelectorAll('.categories-dropdown-text');
                            for ( let c = 0; c < else_dropdowns_to_close_items.length; c++ ) {
                                try {
                                    sub_menus[c] = else_dropdowns_to_close_items[c].parentNode.nextElementSibling;
                                    console.log(sub_menus[c]);
                                    sub_menus[c].classList.remove('unselected');
                                    sub_menus[c].classList.remove('only');
                                    if ( c != 0 ) {
                                        sub_menus[c].classList.remove('opened');
                                    }
                                } catch {

                                }
                            }
                        });
                    }
                }
            }
        }

        if ( top_dropdown.classList.contains("categories-dropdown") && top_dropdown.classList.contains("only") ) {
            let header = top_dropdown.parentNode.previousElementSibling.querySelector('.categories-header');
            header.classList.add('unselected');
            header.addEventListener('click', function() {
                header.classList.remove('unselected');
                for ( let a = 0; a < dropdowns.length; a++ ) {
                    if ( !dropdowns[a].classList.contains('only') ) {
                        dropdowns[a].style.display = "block";
                    } else {
                        dropdowns[a].classList.remove('only');
                        dropdowns[a].classList.remove('unselected');
                        let dropdowns_to_close = dropdowns[a].querySelectorAll('.opened');
                        for ( let b = 0; b < dropdowns_to_close.length; b++ ) {
                            dropdowns_to_close[b].classList.remove('only');
                            dropdowns_to_close[b].classList.remove('unselected');
                            dropdowns_to_close[b].classList.remove('opened');
                        }
                    }
                }
            });
        }
        if ( top_dropdown.classList.contains("categories-dropdown-in-dropdown") && top_dropdown.classList.contains("only") ) {
            top_dropdown.parentNode.parentNode.classList.add('unselected');
        }
        if ( top_dropdown.classList.contains("categories-dropdown-in-dropdown-in-dropdown") ) {
            top_dropdown.parentNode.parentNode.classList.add('unselected');
        }
        if ( top_dropdown.classList.contains("categories-dropdown-in-dropdown-in-dropdown-in-dropdown") ) {
            top_dropdown.parentNode.parentNode.classList.add('unselected');
        }
        if ( top_dropdown.classList.contains("categories-dropdown-in-dropdown-in-dropdown-in-dropdown-in-dropdown") ) {
            top_dropdown.parentNode.parentNode.classList.add('unselected');
        }
    });
}

// @media

const banner = window.matchMedia('(max-width: 768px)');

function changeBanner(e) {
    if (e.matches) {
        document.querySelector('.main-banner-webp').srcset = "img/main-banner-low-res.webp";
        document.querySelector('.main-banner-img').src = "img/main-banner-low-res.jpg";
    } else {
        document.querySelector('.main-banner-webp').srcset = "img/main-banner.webp";
        document.querySelector('.main-banner-img').src = "img/main-banner.jpg";
    }
}

banner.addListener(changeBanner);
changeBanner(banner);