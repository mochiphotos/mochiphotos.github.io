fetch('data.json')
    .then(response =>{
        if (!response.ok){
            throw new Error('Could not fetch files get out github');
        }return response.json();
    })
    .then(data => {
    const pageTitle = document.title; // Getting title (Subheadings)
    const galleryContent = GalleryHTML(data, pageTitle);

    document.querySelector(".gallery").innerHTML = galleryContent;

    // clieck event listener to each image 
    document.querySelectorAll(`.gallery img`).forEach(img => {
        document.body.classList.add('no-hover'); //Disabling Hover
        img.addEventListener('click', () => 
            openModal(img.src));
    });
}).catch(error => console.error('Error fetching JSON:', error));


function GalleryHTML(data, Sort){
    let galleryhtml = '';
    let menuhtml = '';

    for (const [category, file] of Object.entries(data)){
         // Add category to the mobile menu
         menuhtml += `<li><a href="${category}.html">${category}</a></li>`;
         
         if(category === Sort){
            galleryhtml += `<div class="Name">${Sort}</div>`
            galleryhtml += `<div class="item">`;
            file.forEach((file,i)=> {
                if(!file.startsWith('.')){
                    galleryhtml += `
                        <div class="img" style="--position:${i}">
                            <img src="photos/${category}/${file}" alt="${file}">
                        </div>`;
                }
            });
            galleryhtml += `</div>`
         }
        }
    document.getElementById("categoryLinks").innerHTML += menuhtml; // Populate mobile menu
    return galleryhtml;
}

// Open modal and add blur 
function openModal(src){
    document.getElementById('modal-image').src = src;
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('content').classList.add('blur');
}

// Close modal and remove blur
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('content').classList.remove('blur');
    document.body.classList.remove('no-hover');
}

//toggle for menu bar 
const menu = document.getElementById('mobileMenu');
const icon = document.querySelector(".menu-icon");

function toggleMenu() {
    menu.classList.toggle('active');
    icon.classList.toggle('active');
}