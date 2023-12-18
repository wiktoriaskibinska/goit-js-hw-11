import axios from 'axios';
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const searchBttn = document.querySelector('button');
const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const loadMoreBttn = document.querySelector('.load-more');
let queryValue = '';
let currentPage = '';
loadMoreBttn.style.display = 'none';
const API_KEY = `41240894-272bca1f2c3dcb1548b81eb12`;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  queryValue = evt.currentTarget.elements.searchQuery.value;
  currentPage = 1;
  gallery.innerHTML = '';
  fetchImages();
}

loadMoreBttn.addEventListener('click', () => {
  fetchImages();
});

async function fetchImages() {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        queryValue
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`
    );
    const images = await response.data;
    console.log(images);
    if (images.hits.length === 0) {
      loadMoreBttn.style.display = 'none';
      Notiflix.Report.failure(
        'Sorry!',
        'No images found!Please try again :)',
        'OK'
      );
    }
    currentPage += 1;
    loadMoreBttn.style.display = 'block';

    if (currentPage === 2) {
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`, {
        position: 'center-top',
      });
    }

    renderGallery(images.hits);
    if (currentPage > Math.ceil(images.totalHits / 40)) {
      loadMoreBttn.style.display = 'none';
      Notiflix.Report.info(
        'End of results',
        'sorry you have reached end of the results',
        'OK'
      );
    }
  } catch (error) {
    loadMoreBttn.style.display = 'none';
    Notiflix.Report.failure(
      'Error!',
      'There was an error! Please try again',
      'OK'
    );
    console.log(error);
  }
}

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${image.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
/*key - Twój unikalny klucz dostępu do API.
q - termin, który chcemy wyszukać. W tej aplikacji to treść którą będzie wpisywał użytkownik.
image_type - typ obrazka. Chcemy tylko zdjęcia, dlatego określ wartość parametru jako photo.
orientation - orientacja zdjęcia. Określ wartość horizontal.
safesearch - wyszukiwanie obrazków SFW (Safe For Work). Określ wartość true.*/
