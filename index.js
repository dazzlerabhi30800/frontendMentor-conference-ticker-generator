const avatarInput = document.querySelector("#avatarInput");
const avatarLabel = document.querySelector("#avatarLabel");
const avatarWrapper = document.querySelector("#avatarWrapper");
const avatarImg = document.querySelector("#avatarImg");
const form = document.querySelector("form");

const ticketWrapper = document.getElementById("ticket--wrapper");
const infoWrapper = document.getElementById("info--wrapper");

// additional info on ticker
const fullNameSpan = document.getElementById("full--name");
const userName = document.getElementById("user--name");
const userImg = document.getElementById("user--img");
const githubUserName = document.getElementById("github--name");
const emailSpan = document.getElementById("user--email");
const errMsg = document.getElementById("errMsg");

// buttons
const removeBtn = document.getElementById("remove--img");
let avatarFile = null;

// NOTE: Gsap timeline
var tl = gsap.timeline();

// functions that will be used a lot;

function changeStates(isShowLabel, file) {
  if (isShowLabel) {
    avatarLabel.style.display = "flex";
    avatarImg.src = "";
    avatarImg.alt = "Avatar Image";
    avatarWrapper.style.display = "none";
  } else if (file.size > 500000) {
    alert("File size is greater than 500kb");
  } else {
    avatarLabel.style.display = "none";
    avatarImg.src = URL.createObjectURL(file);
    avatarFile = file;
    avatarImg.alt = file.name;
    avatarWrapper.style.display = "flex";
  }
}

avatarLabel.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer;
  const items = [...data.items];
  if (items.length > 1) {
    alert("you can't upload more than 1 file");
    return;
  }
  items.forEach((item) => {
    if (item.kind === "file") {
      const file = item.getAsFile();
      changeStates(false, file);
    }
  });
});

avatarLabel.addEventListener("dragover", (e) => {
  e.preventDefault();
});

avatarInput.onchange = (e) => {
  const file = e.target.files[0];
  if (file) {
    changeStates(false, file);
  }
  return;
};

removeBtn.onclick = () => {
  changeStates(true);
};

function successSubmit(name, email, githubUsername) {
  infoWrapper.style.display = "none";
  ticketWrapper.style.display = "block";
  emailSpan.textContent = email;
  fullNameSpan.textContent = name;
  userName.textContent = name;
  githubUserName.textContent = githubUsername;
  userImg.src = URL.createObjectURL(avatarFile);
  userImg.setAttribute("alt", name);

  // set gsap styling username, fullname, email & tket
  tl.fromTo(
    ".ticket--container",
    {
      y: -300,
      opacity: 0,
      scale: 0,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1,0.6)",
    },
  );
}

form.onsubmit = (e) => {
  e.preventDefault();

  const emailPattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}";
  const flags = "gm";
  const emailRegexPattern = new RegExp(emailPattern, flags);
  const githubRegexPattern = new RegExp("^@w*", "gm");

  const name = e.target.querySelector("#fullname");
  const email = e.target.querySelector("#emailAddress");
  const githubUsername = e.target.querySelector("#github--username");

  let errStr = "";

  if (!avatarFile) {
    errStr += "you haven't uploaded your avatar, ";
  }
  if (name.value.length < 5) {
    errStr += "you have a very short name, ";
  }
  if (!email.value.match(emailRegexPattern)) {
    errStr += "please enter a valid email address, ";
  }
  if (
    !githubUsername.value.match(githubRegexPattern) ||
    githubUsername.value.length < 8
  ) {
    errStr += ", Github Username is too short or doesn't start with @";
  }

  if (errStr === "") {
    errMsg.classList.remove("showErr");
    successSubmit(name.value, email.value, githubUsername.value);
    return;
  }

  errMsg.classList.add("showErr");
  errMsg.textContent = errStr;
};

document.addEventListener("DOMContentLoaded", () => {
  tl.fromTo(
    "#conf--logo",
    { y: -200, opacity: 0, duration: 400 },
    { y: 0, opacity: 1 },
  );

  tl.fromTo("h1", { y: -300, opacity: 0, duration: 400 }, { y: 0, opacity: 1 });
  tl.fromTo(
    "#header--text",
    { y: -400, opacity: 0, duration: 400 },
    { y: 0, opacity: 1 },
  );

  tl.fromTo(
    "form",
    { y: -800, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      zIndex: 444,
      duration: 1,
      ease: "elastic.out(1,0.8)",
    },
  );
});
