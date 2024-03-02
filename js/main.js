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
                    <p># <span>music</span></p>
                    <p>Author : <span>Awlad hossain</span></p>
                  </div>
                  <h2 class="text-2xl font-bold">
                    10 kids unaware of Their Halloween Costume
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rem, ducimus.
                  </p>
                </div>
                <div class="flex justify-between p-5">
                  <div class="flex gap-8 items-center">
                    <p><i class="fa-regular fa-message"></i><span>10</span></p>
                    <p><i class="fa-regular fa-eye"></i><span>10</span></p>
                    <p><i class="fa-regular fa-clock"></i><span>10</span></p>
                  </div>
                  <div>
                    <button
                      class="bg-green-400 w-8 h-8 rounded-full flex items-center justify-center"
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

loadData();
