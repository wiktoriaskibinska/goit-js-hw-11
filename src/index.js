import axios from 'axios';

const input = document.querySelector('input');
const button = document.querySelector('button');
const form = document.querySelector('form');

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();
  const queryValue = evt.currentTarget.value;
  fetchImages();
}

const API_KEY = `41240894-272bca1f2c3dcb1548b81eb12`;
const URL =
  'https://pixabay.com/api/?key=' +
  API_KEY +
  '&q=flower' +
  '&image_type=photo' +
  '&orientation=horizontal' +
  '&safesearxh=true' +
  '&per_page=40';

const fetchImages = async () => {
  try {
    const response = await axios.get(URL);
    const images = await response.data;
    console.log(images);
  } catch (error) {
    console.log(error);
  }
};
/*key - Twój unikalny klucz dostępu do API.
q - termin, który chcemy wyszukać. W tej aplikacji to treść którą będzie wpisywał użytkownik.
image_type - typ obrazka. Chcemy tylko zdjęcia, dlatego określ wartość parametru jako photo.
orientation - orientacja zdjęcia. Określ wartość horizontal.
safesearch - wyszukiwanie obrazków SFW (Safe For Work). Określ wartość true.*/
