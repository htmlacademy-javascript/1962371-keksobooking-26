const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatarElement = document.querySelector('#avatar');
const avatarElement = document.querySelector('.ad-form-header__preview img');
const initialAvatarSrc = avatarElement.src;
const fileChooserImageElement = document.querySelector('#images');
const imagePreviewElement = document.querySelector('.ad-form__photo');
const initialPreviewBackground = imagePreviewElement.style.backgroundImage;

fileChooserAvatarElement.addEventListener('change', () => {
  const file = fileChooserAvatarElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarElement.src = URL.createObjectURL(file);
  }
});

fileChooserImageElement.addEventListener('change', () => {
  const file = fileChooserImageElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreviewElement.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});

const clearImages = () => {
  avatarElement.src = initialAvatarSrc;
  fileChooserAvatarElement.value = '';
  imagePreviewElement.style.backgroundImage = initialPreviewBackground;
  fileChooserImageElement.value = '';
};

export { clearImages };
