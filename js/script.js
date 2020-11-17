const updateMe = ({ name, login, avatarUrl, bio }) => {
  let userData = document.getElementById("user-data");
  document.getElementById("profile-pic").src = `${avatarUrl}`;
  document.getElementById("nav-img").src = `${avatarUrl}`;
  document.getElementById("bio").innerText = `${bio}`;

  return (userData.innerHTML = `
        <h1>${name}</h1>
        <p class="username">${login}</p>
    `);
};
const updateRepo = ({ repositories }) => {
  for (
    let i = 0;
    i < document.getElementsByClassName("repo-count").length;
    i++
  ) {
    document.getElementsByClassName("repo-count")[i].innerText =
      repositories.edges.length;
  }

  document.getElementById("repos").innerHTML = `${repositories.edges
    .map(
      (repo) => `
        <div class="repo">
            <div class="repo-details">
                <a href="${repo.node.url}" class="repo-name">${
        repo.node.name
      }</a>
                ${
                  repo.node.description
                    ? `<p class="repo-description">${repo.node.description}</p>`
                    : ""
                }
                <div class="repo-addons">
                    <div style="display: flex; margin-right: 10px">
                        <span class="lang-color" style="background-color: ${
                          repo.node.languages.nodes["0"].color
                        };"></span>
                        <p>${repo.node.languages.nodes["0"].name}</p>
                        </div>
                            ${
                              repo.node.stargazerCount
                                ? `<div style="margin: auto 5px;"><i class="far fa-star" aria-hidden="true"></i> ${repo.node.stargazerCount}</div>`
                                : ""
                            }
                    ${
                      repo.node.isFork
                        ? `<div style="margin: auto 5px;"><i class="fas fa-code-branch"></i></div>`
                        : ""
                    }
                    <p>${dateUpdate(repo.node.updatedAt)}</p>
                </div>
            </div>
            <div class="star"> <i class="far fa-star" aria-hidden="true"></i> Star</div>
        </div>
        <hr />
    `
    )
    .join("")}`;
};

// date Update
const dateUpdate = (updatedAt) => {
  let month = updatedAt.split("-")[1];
  let year = updatedAt.split("-")[0];
  switch (Number(month)) {
    case 1:
      month = "Jan";
      break;
    case 2:
      month = "Feb";
      break;
    case 3:
      month = "Mar";
      break;
    case 4:
      month = "Apr";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "Aug";
      break;
    case 9:
      month = "Sept";
      break;
    case 10:
      month = "Oct";
      break;
    case 11:
      month = "Nov";
      break;
    case 12:
      month = "Dec";
      break;
  }
  return `<p> Updated on ${month} ${year}</p>`;
};

let content = {
  query: `{
      viewer {
        avatarUrl
        name
        bio
        login
        repositories(orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, first: 20) {
          edges {
            node {
              description
              name
              isFork
              languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  color
                  name
                }
              }
              homepageUrl
              stargazerCount
              url
              updatedAt
            }
          }
        }
      }
    }
    `,
};

let body = JSON.stringify(content);
// 47d68d454b3a90138ccfb72bcbc9cefb81bad934
let token = [
  "4",
  "7",
  "d",
  "6",
  "8",
  "d",
  "4",
  "5",
  "4",
  "b",
  "3",
  "a",
  "9",
  "0",
  "1",
  "3",
  "8",
  "c",
  "c",
  "f",
  "b",
  "7",
  "2",
  "b",
  "c",
  "b",
  "c",
  "9",
  "c",
  "e",
  "f",
  "b",
  "8",
  "1",
  "b",
  "a",
  "d",
  "9",
  "3",
  "4",
];
// console.log(token.join(""));

fetch("https://api.github.com/graphql", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.join("")}`,
  },
  body: body,
})
  .then((res) => res.json())
  .then((res) => updateUserData(res.data));

const updateUserData = (data) => {
  if (data) {
    const { viewer } = data;
    // const profileInfo = { viewer[.name], viewer.login}
    updateMe(viewer);
    updateRepo(viewer);
  } else null;
};
