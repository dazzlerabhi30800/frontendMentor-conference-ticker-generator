const avatarInput = document.querySelector("#avatarInput");
const avatarLabel = document.querySelector("#avatarLabel");
const avatarWrapper = document.querySelector('#avatarWrapper');
const avatarImg = document.querySelector('#avatarImg');
const form = document.querySelector('form');

const ticketWrapper = document.getElementById('ticket--wrapper');
const infoWrapper = document.getElementById('info--wrapper');


// additional info on ticker
const fullNameSpan = document.getElementById('full--name');
const userName = document.getElementById('user--name');
const userImg = document.getElementById('user--img');
const githubUserName = document.getElementById('github--name');
const emailSpan = document.getElementById('user--email');


// buttons
const removeBtn = document.getElementById("remove--img");

let avatarFile = null;

// functions that will be used a lot;

function changeStates(isShowLabel, file) {
    if (isShowLabel) {
        avatarLabel.style.display = "flex";
        avatarImg.src = "";
        avatarImg.alt = "Avatar Image";
        avatarWrapper.style.display = "none";
    }
    else if (file.size > 500000) {
        alert("File size is greater than 500kb");
    }
    else {
        avatarLabel.style.display = "none";
        avatarImg.src = URL.createObjectURL(file);
        avatarFile = file;
        avatarImg.alt = file.name;
        avatarWrapper.style.display = "flex";
    }
}

avatarLabel.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer;
    const items = [...data.items];
    if (items.length > 1) { alert("you can't upload more than 1 file"); return };
    items.forEach(item => {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            changeStates(false, file);
        }
    })
})

avatarLabel.addEventListener('dragover', (e) => {
    e.preventDefault();
})




avatarInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
        changeStates(false, file);
    }
    return;
}

removeBtn.onclick = () => {
    changeStates(true);
}

function successSubmit(name, email, githubUsername) {
    infoWrapper.style.display = 'none';
    ticketWrapper.style.display = "block";
    emailSpan.textContent = email;
    fullNameSpan.textContent = name;
    userName.textContent = name;
    githubUserName.textContent = githubUsername;
    userImg.src = URL.createObjectURL(avatarFile);
    userImg.setAttribute('alt', name);
}

form.onsubmit = (e) => {
    e.preventDefault();

    const emailPattern = "[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"
    const flags = "gm";
    const emailRegexPattern = new RegExp(emailPattern, flags);
    const githubRegexPattern = new RegExp("^@\w*", "gm");

    const name = e.target.querySelector('#fullname');
    const email = e.target.querySelector('#emailAddress');
    const githubUsername = e.target.querySelector('#github--username');


    if (!avatarFile) alert("you haven't uploaded your avatar");
    if (name.value.length < 5) alert("you have a very short name");
    if (!email.value.match(emailRegexPattern)) alert("please enter a valid email address");
    if (!githubUsername.value.match(githubRegexPattern) || githubUsername.value.length < 8) {
        alert("Github Username is too short or doesn't start with @");
        return;
    }

    successSubmit(name.value, email.value, githubUsername.value);
}
