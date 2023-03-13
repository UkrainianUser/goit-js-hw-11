import Notiflix from 'notiflix';
import axios from 'axios';

const searchForm = document.querySelector('#search-form')
const input = document.querySelector('#search-form input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const searchParams = new URLSearchParams({
	key: "34311781-efd5fccfe1ca82ca08bcfd072",
	q: "",
	image_type: "photo",
	orientation: "horizontal",
	safesearch: true,
	per_page: 40,
	page: 1,
});

searchForm.addEventListener("submit", (event) => handleSubmit(event, input, searchParams));

function setSearchParams(input, searchParams) {
  searchParams.set("q", input.value);
}

function getURL(searchParams) {
  return `https://pixabay.com/api/?${searchParams.toString()}`;
}

// function clearInput(input) {
//   input.value = '';
// }

function getImages(URL) {
  return axios.get(URL)
    .then(response => {
      const images = response.data.hits.map(hit => ({
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      }));
      
      if (images.length === 0) {
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      } else {
        galleryEl.innerHTML = renderGallery(images);
				loadMoreBtn.style.display = 'block';
      }
      
      return images;
    })
    .catch((error) => {
      console.log(error);
      Notiflix.Notify.failure('Error fetching images');
    });
}

function handleSubmit(event, input, searchParams) {
  event.preventDefault();

  setSearchParams(input, searchParams);
  const URL = getURL(searchParams);
  // clearInput(input);
  getImages(URL)
    .then(img => console.log(img))
    .catch((error) => console.log(error));
}


function renderGallery(images) {
  const markup = images.map((image) => `<div class="photo-card">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${image.views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${image.downloads}
      </p>
    </div>
  </div>`).join("");

  return markup;
};