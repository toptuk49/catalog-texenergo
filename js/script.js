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
        if (group_and_category_buttons.style.display == 'none') {
            group_and_category_buttons.style.display = 'flex';
            brands_keyboard.style.display = 'none';
            brands_list.style.display = 'none';
            brands.classList.remove('selected');
            group.classList.add('selected');
            popular.style.display = 'flex';
            all_categories.style.display = 'flex';
        } else {
            return;
        }
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
        brands_keyboard.style.display = 'flex';
        brands_list.style.display = 'flex';
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
        popular.style.display = 'flex';
        all_categories.style.display = 'flex';
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

