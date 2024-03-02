const loadData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
  const allPost = data.posts;
  const postContainer = document.getElementById("post-container");
  const activeDot = document.getElementById("active-dot");
  let dotColor = "bg-green-600";

  allPost.forEach((post) => {
    if (!post.isActive) {
      dotColor = "bg-red-500";
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
loadData();
