import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form')
const input = document.querySelector('#search-form input');
const searchButton = document.querySelector('#search-button');

const searchParams = new URLSearchParams({
	key: "34311781-efd5fccfe1ca82ca08bcfd072",
	q: "",
	image_type: "photo",
	orientation: "horizontal",
	safesearch: true,
});

searchForm.addEventListener("submit", (event) => {
	event.preventDefault();
	searchParams.set("q", input.value);

	const URL = `https://pixabay.com/api/?${searchParams.toString()}`;
	console.log(URL);

	input.value = '';

	fetch(URL)
	.then(response => response.json())
	.then(img => console.log(img))
	.catch((error) => console.log(error));
});

function renderGallery (images) {
// 	const markup = (`<div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>`)
// .join("");
}