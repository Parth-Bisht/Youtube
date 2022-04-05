const data = JSON.parse(localStorage.getItem("video"));
const input = JSON.parse(localStorage.getItem("search"));
const primary = document.getElementById('primary');
console.log(data);
let display = (data) => {
    primary.innerHTML = "";
    data.forEach(({ id: { videoId }, title, id }) => {
        let playerDiv = document.createElement("div");

        let iframe = document.createElement('iframe');
        if (videoId == undefined) {
            iframe.src = `https://www.youtube.com/embed/${id}`;
        }
        else {

            iframe.src = `https://www.youtube.com/embed/${videoId}`;
        }
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.allow = 'fullscreen';
        iframe.style.border = 'none';
        playerDiv.append(iframe);

        let infoDiv = document.createElement('div');
        let name = document.createElement('p');
        name.innerText = title;
        let icons = document.createElement('div');
        icons.setAttribute("id", "likeshare");
        icons.innerHTML = `<i class="fa-solid fa-thumbs-up"></i><p>Like</p> <i class="fa-solid fa-thumbs-down"></i><p>Disike</p> <i class="fa-solid fa-share"></i><p>Share</p> <i class="fa-solid fa-scissors"></i><p>Clip</p> <i class="fa-solid fa-plus"></i><p>Save</p> <i class="fa-solid fa-ellipsis"></i>`
        infoDiv.append(name, icons);
        primary.append(playerDiv, infoDiv);
    });
}
display(data);

console.log(input);


const searchVideos = async () => {

    try {
        // let inp = document.getElementById('search').value;
        // localStorage.setItem("search", JSON.stringify(inp));
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD3-DqUNFWb2Sgq5E5NlGKfPr1zRs5qo2o&maxResults=20`);
        let data = await res.json();
        let videos = data.items;
        console.log(videos);
        appendVideos(videos);
        // return videos;

    }
    catch (err) {
        console.log(err);
    }

};

const secondary = document.getElementById('secondary');
const appendVideos = (data) => {
    secondary.innerHTML = "";
    data.forEach(({ id, snippet, snippet: { title }, snippet: { thumbnails: { medium: { url } } }, snippet: { channelTitle } }) => {
        let div = document.createElement('div');
        div.addEventListener("click", () => {
            const videodata = [{ id, ...snippet }];
            tolocal(videodata)
            console.log(videodata);
        })

        let infoDiv = document.createElement('div');
        infoDiv.setAttribute("id", "infodiv")
        let p = document.createElement('p');
        p.innerText = title;
        let channel = document.createElement('p');
        channel.innerText = channelTitle;
        infoDiv.append(p, channel);

        let thumbnailDiv = document.createElement('div');
        let iframe = document.createElement('img');
        iframe.src = url;
        // iframe.allow = 'fullscreen';
        thumbnailDiv.append(iframe);
        div.append(thumbnailDiv, infoDiv);
        secondary.append(div);
    });
};
searchVideos();

function tolocal(videoData) {
    localStorage.setItem("video", JSON.stringify(videoData));
    let newdata = JSON.parse(localStorage.getItem("video"));
    // window.location.href = "player.html";
    display(newdata);
    console.log(videoData);
}

function searchV() {
    const input = document.getElementById("search").value;
    console.log(input);
    localStorage.setItem("search", JSON.stringify(input));
    window.location.href = "search.html"

}