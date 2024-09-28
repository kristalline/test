const createModal = (el) => {
    console.log('modal!')
    const modal = document.createElement('div');
    modal.classList.add('modal', 'overlay');

    const modalInner = document.createElement('div');
    modalInner.classList.add('modal-inner');

    const modalImg = document.createElement('img');
    modalImg.setAttribute("src", el.urls.regular);
    modalImg.setAttribute("alt", '');
    modalImg.classList.add('modal-img');

    const modalCloseBtn = document.createElement('button');
    modalCloseBtn.classList.add('modal-close');
    const modalImgBtn = document.createElement('img');
    modalImgBtn.setAttribute("src", 'images/close.svg');
    modalCloseBtn.append(modalImgBtn);

    const modalDescription = document.createElement('div');
    modalDescription.classList.add('modal-description');

    const modalLink = document.createElement('a');
    Object.assign(modalLink, {
        className: 'modal-link',
        href: el.user.links.html,
        target: '_blank',
    });

    const modalAvatar = document.createElement('img');
    modalAvatar.classList.add('profile-img')
    modalAvatar.setAttribute("src", el.user.profile_image.small);
    modalAvatar.setAttribute("alt", 'profile image');
    modalLink.append(modalAvatar);

    const modalTitle = document.createElement('div');
    modalTitle.classList.add('modal-author');
    modalTitle.textContent = `${el.user.name}`;
    modalLink.append(modalTitle);

    modalDescription.append(modalLink);
    if (el.description) {
        const modalText = document.createElement('div');
        modalText.classList.add('modal-text');
        modalText.textContent = `Description: ${el.description}`;
        modalDescription.append(modalText);
    }

    modalInner.append(modalCloseBtn);
    modalInner.append(modalImg);
    modalInner.append(modalDescription)
    modal.append(modalInner);

    const body = document.querySelector('body');
    body.append(modal);
    
    body.classList.add('overflow-hidden');
    modalCloseBtn.addEventListener('click', () => {
        modal.remove();
        body.classList.remove('overflow-hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            body.classList.remove('overflow-hidden');
        }
    });

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modal.remove();
            body.classList.remove('overflow-hidden');
        }
    });
    return modal;
};

export default createModal;