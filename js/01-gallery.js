import { galleryItems } from "./gallery-items.js";

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
      handler: null, // <<< This key is needed to store a pointer to the function that BIND will return.
      // Below - we change the library functions onShow and onClose.
      // because arrow functions don't have their own "this".
      onShow(instance) {
        this.handler = closeByEsc.bind(instance);
        window.addEventListener("keydown", this.handler);
      },
      onClose() {
        window.removeEventListener("keydown", this.handler);
      },
    }
  );
  instance.show();
}

function closeByEsc(e) {
  e.code === "Escape" && this.close();
}
