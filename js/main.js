const postContainer = document.getElementById("post-container");
const latestPostContainer = document.getElementById("latest-post-container");
const loadingSpinner = document.getElementById("loading-spinner");
const loadData = async () => {
  showLoadingSpinner();

  await new Promise((spinnerBreak) => setTimeout(spinnerBreak, 2000));
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
  const allPost = data.posts;

  displayPosts(allPost);
  // setTimeout(() => {
  //   hideLoadingSpinner();
  // }, 2000);
  hideLoadingSpinner();
};

let dotColor = "";

const displayPosts = (allPost) => {
  allPost.forEach((post) => {
    if (post.isActive) {
      dotColor = "bg-green-600";
    } else {
      dotColor = "bg-red-600";
    }
    const div = document.createElement("div");
    const title = post.title;
    div.classList = `p-5 mt-5 bg-[#797dfc1a] rounded-lg flex`;
    div.innerHTML = `
            <div class="relative rounded-2xl    w-20 mt-5">
                <img class="w-full object-cover rounded-2xl" src="${post.image}" alt="" />
                <div id="active-dot"
                  class="h-4 w-4 ${dotColor}  rounded-full absolute right-[-4px] top-[-4px]"
                ></div>
              </div>
              <div class="w-full">
                <div
                  class="border-b-2 space-y-4 border-dashed border-gray-300 p-5"
                >
                  <div class="flex gap-5 items-center">
                    <p># <span>${post.category}</span></p>
                    <p>Author : <span>${post.author.name}</span></p>
                  </div>
                  <h2 class="text-2xl font-bold">
                    ${post.title}
                  </h2>
                  <p>
                    ${post.description}
                  </p>
                </div>
                <div class="flex justify-between p-5">
                  <div class="flex gap-8 items-center">
                    <p><i class="fa-regular fa-message"></i><span> ${post.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i><span> ${post.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i><span> ${post.posted_time}</span> min</p>
                  </div>
                  <div>
                    <button onclick="markAsRead(&#34;${title}&#34;,&#34; ${post.view_count}&#34;)"
                      class="read-btn bg-green-400 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <i class="fa-regular fa-envelope-open"></i>
                    </button>
                  </div>
                </div>
              </div>
    `;

    postContainer.appendChild(div);
  });
};

let readCount = 0;
const markAsRead = (title, views) => {
  const markAsReadContainer = document.getElementById("mark-as-read-container");
  const div = document.createElement("div");
  div.classList = `flex items-center justify-between p-4 rounded-lg`;
  div.innerHTML = `
<h1 class="text-2xl font-bold w-[400px]">${title}</h1>
                <div class="text-lg">
                  <i class="fa-regular fa-eye"></i>
                  <span>${views}</span>
                </div>
`;
  console.log(title, views);

  readCount++;
  const readCounter = document.getElementById("read-count");
  readCounter.innerText = readCount;
  markAsReadContainer.appendChild(div);
};

const searchPost = () => {
  postContainer.textContent = "";
  const searchField = document.getElementById("search-field");
  const searchedCategory = searchField.value;
  const search = async () => {
    showLoadingSpinner();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchedCategory}`
    );
    const data = await response.json();
    const allSearchedPosts = data.posts;
    displayPosts(allSearchedPosts);
    hideLoadingSpinner();
  };
  search();
};

const loadLatestPosts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();
  data.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.classList = `rounded-3xl  shadow-xl border border-black`;
    div.innerHTML = `
    <figure class="px-5 pt-5">
              <img
                src="${item.cover_image}"
                alt=""
                class="rounded-xl"
              />
            </figure>
            <div class="p-5 space-y-2">
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-calendar"></i>
                <span>${
                  item.author.posted_date
                    ? item.author.posted_date
                    : "No publish date"
                }</span>
              </div>
              <h2 class="card-title font-bold text-xl">${item.title}</h2>
              <p>${item.description}</p>
              <div class="flex items-center gap-2">
                <div class="w-12 h-12 bg-red-300 rounded-full">
                  <img class="w-full rounded-full" src="${
                    item.profile_image
                  }" alt="" />
                </div>
                <div class="">
                  <p class="font-bold text-lg">${item.author.name}</p>
                  <p>${
                    item.author.designation
                      ? item.author.designation
                      : "Unknown"
                  }</p>
                </div>
              </div>
            </div>
    `;
    latestPostContainer.appendChild(div);
  });
};

const showLoadingSpinner = () => {
  loadingSpinner.classList.remove("hidden");
};
const hideLoadingSpinner = () => {
  loadingSpinner.classList.add("hidden");
};

loadLatestPosts();
loadData();
