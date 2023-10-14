import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
gallery.innerHTML = getGalleryMarkup();
gallery.addEventListener("click", modalHandle);

function getGalleryMarkup() {
  return galleryItems
    .map(
      (item) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"/>
        </a>
      </li>`
    )
    .join("");
}

function modalHandle(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) return;
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`,
    {
      onShow: () => window.addEventListener("keydown", closeByEsc),
      onClose: () => window.removeEventListener("keydown", closeByEsc),
    }
  );
  const closeByEsc = (e) => e.code === "Escape" && instance.close();
  instance.show();
}