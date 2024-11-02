fetch('data.json')  // Path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch file names');
            }
            return response.json(); })
        .then(data => {
            const galleryHTML = generateGalleryHTML(data);

            document.querySelector(".gallery").innerHTML = galleryHTML;

            // click event listener to each image 
            document.querySelectorAll(`.gallery img`).forEach(img => {
                document.body.classList.add('no-hover'); //Disabling Hover
                img.addEventListener('click', () => openModal(img.src));
            });

            //event listener for hovering 
            document.querySelectorAll(`.gallery h2`).forEach(h2 => {
                h2.addEventListener("mouseover", () => cathover(h2));
                h2.addEventListener("mouseover", () => titleoff());
                h2.addEventListener("mouseout", () => h2.classList.remove("active"));
                h2.addEventListener("mouseout", () => title.classList.remove("active")); // Remove active on mouse out
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));

function generateGalleryHTML(data) {
    let galleryHTML = '';
    let categoryLinksHTML = ''; // For the mobile menu

    for (const [category, file] of Object.entries(data)){
        // Add category to the mobile menu
        categoryLinksHTML += `<li><a href="${category}.html">${category}</a></li>`;

        // Populate the gallery content 
        galleryHTML += `<h2><a href=${category}.html style="color: var(--brown); text-decoration: none;">${category}</h2></a><div class="item">`;

        file.forEach((file,i)=> {
            if(!file.startsWith('.')&& i <=2){
                galleryHTML += `
                    <div class="img${category}" style="--position:${i}">
                        <img src="photos/${category}/${file}" alt="${file}">
                    </div>`;
            }
            
        });
        galleryHTML += `</div>`
    }
    
    //document.querySelector(".gallery").innerHTML = galleryHTML;
    document.getElementById("categoryLinks").innerHTML += categoryLinksHTML; // Populate mobile menu
    return galleryHTML;
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

//Hovering text 
const cat = document.querySelectorAll('h2');

function cathover(h2) {
    h2.classList.toggle('active');
}

function titleoff(){
    title.classList.toggle('active');
}