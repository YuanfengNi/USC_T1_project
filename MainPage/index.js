let page=1;
getMovies(page);

function getMovies(pageNumber){  
    const URL = "https://api.themoviedb.org/3/movie/popular?";
    const imgPath = "https://image.tmdb.org/t/p/w500";

    const API_KEY = "api_key=e948beedc52b1fb9aee80d4b36bf7b0f";
    const LANG = "&language=en-US";
    let url = URL + API_KEY + LANG;

    let container = document.querySelector(".container"); 
    container.innerHTML = ``;

    fetch(url + "&page=" + pageNumber).then((res) => res.json()).then(
        function(data) {
            let page = data.results;
            let frag = document.createDocumentFragment();

            page.forEach((item, index) => {
                let movie = document.createElement("div");
                //console.log("\n********\n" + url + item.poster_path);
                https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US"
                movie.innerHTML = `
                  <div class="movie ${index}">
                    <!-- button class="like-button">
                      <i class="fa fa-heart"></i>
                      <span class="like-text"></span>
                    </button -->
                    <img src="${imgPath + item.poster_path}">
                    <p>${item.original_title}</p>
                    <p>${item.release_date}</p>
                  </div>
                `;
                frag.appendChild(movie);
            //console.log(item);
            });
            container.appendChild(frag);

            //console.log(page.length);
        }
    ).catch(function(error) {
        console.log(error);
    });
}

let nextPageButton = document.querySelector(".nextPage");
let prePageButton = document.querySelector(".prePage");

prePageButton.addEventListener('click', () => {
  page--;
  getMovies(page);

  if(page == 1) {
    prePageButton.classList.add("disabled");
    prePageButton.innerHTML = "No More";
  }
});

nextPageButton.addEventListener('click', () => {
  page++;
  getMovies(page);

  if(page > 499) {
    nextPageButton.classList.add("disabled");
    nextPageButton.innerHTML = "No More";
  }

  if(page == 2) {
    prePageButton.classList.remove("disabled");
    prePageButton.innerHTML = "Previous Page";
  }
});


let likeList = ["1", "2"];

let addButton = document.querySelector("#addButton");
let todoContainer = document.querySelector("#todoContainer");
let todoInput = document.querySelector("#todoInput");
let deleteAll = document.querySelector("#deleteAllButton");

function renderLikes() {
  todoContainer.innerHTML = ``;
  // reflow issue
  let frag = document.createDocumentFragment();
  likeList.forEach((item, index) => {
    let todoItem = document.createElement("li");
    // data-test : attribute, event.target.dataset.test
    todoItem.innerHTML = `<span>${item}</span> <button data-index="${index}">x</button>`;
    frag.appendChild(todoItem);
  });
  todoContainer.appendChild(frag);
}

function initActions() {
  addButton.addEventListener("click", () => {
    likeList.push(todoInput.value);
    todoInput.value = "";
    renderList();
  });
  deleteAll.addEventListener("click", () => {
    likeList = [];
    renderList();
  });
  // event bubbling / capturing - event delegation
  todoContainer.addEventListener("click", (event) => {
    // event.target vs event.currentTarget
    // arr.splice() - 1. index, 2. delete num
    const index = event.target.dataset.index;
    if (index !== undefined) {
      likeList.splice(index, 1);
    }
    renderList();
  });
}

// render
function render() {
  renderLikes();
  initActions();
}

render();