console.log("Twitter-Clone");

document.getElementById("userInput").focus();

var input = document.getElementById("userInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    addTweet();
  }
});

// const tweets = [
//   {
//     body: "This is Thien  post signed in!",
//     likeCount: 0,
//    reTweets: [],
//     createdAt: "2019-08-01T04:02:07.096Z",
//     userName: "datloiboi@gmail.com"
//   },
//   {
//     body: "This is Phuong  post signed in!",
//     likeCount: 0,
//    reTweets: [],
//     createdAt: "2019-08-01T04:02:07.096Z",
//     userName: "datloiboi@gmail.com"
//   },
//   {
//     body: "This is Hang  post signed in!",
//     likeCount: 0,
//    reTweets: [],
//     createdAt: "2019-08-01T04:02:07.096Z",
//     userName: "datloiboi@gmail.com"
//   }
// ];

let tweets = JSON.parse(localStorage.getItem("tweets")) || [];

function createTwitterObject() {
  return {
    body: document.getElementById("userInput").value,
    likeCount: 0,
    retweets: [1,2,3,4],
    createdAt: new Date(),
    userName: "New User"
  };
  
  // newTweet.body = document.getElementById("userInput").value;
  // new
  //   console.log("line 36 ", newTweet);
}

function storeTweetsToLocalStorage(tweets){
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function addTweet() {
  newTweet = createTwitterObject();
  tweets.unshift(newTweet);
  console.log("", newTweet);
  renderTweets(tweets);
  document.getElementById("userInput").focus();
  document.getElementById("userInput").value = "";
  storeTweetsToLocalStorage(tweets);
}
function removeTweet(idx) {
  console.log("user delete tweets number", idx);
  tweets.splice(idx, 1);
  renderTweets(tweets);
  storeTweetsToLocalStorage(tweets);
}

function renderTweets(tweets) {
  const liHtmls = tweets.map((el, idx) => {
    return createtweetHtml(el, idx);
  });
  document.getElementById("tweetList").innerHTML = liHtmls.join("");
}

function createtweetHtml(el, idx) {
  return ` <div class="post-bar">
<div class="post_topbar">
  <div class="usy-dt">
    <img src="images/resources/us-pic.png" alt="">
    <div class="usy-name">
      <h3>${el.userName}</h3>
      <span><img src="images/clock.png" alt="">${el.createdAT}</span>
    </div>
  </div>
  <div class="ed-opts">
    <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
    <ul class="ed-options">
      <li><a href="#" title="">Edit Post</a></li>
      <li><a href="#" title="">Unsaved</a></li>
      <li><a href="#" title="">Unbid</a></li>
      <li><a href="#" title="">Close</a></li>
      <li><a href="#" title="">Hide</a></li>
    </ul>
  </div>
</div>
<div class="epi-sec">
  <ul class="descp">
    <li><img src="images/icon8.png" alt=""><span>Epic Coder</span></li>
    <li><img src="images/icon9.png" alt=""><span>India</span></li>
  </ul>
  <ul class="bk-links">
    <li><a href="#" title=""><i class="la la-bookmark"></i></a></li>
    <li><a href="#" title=""><i class="la la-envelope"></i></a></li>
  </ul>
</div>
<div class="job_descp">

  <p>${el.body}</p>
  <ul class="skill-tags">
    <li><a href="#" title="">HTML</a></li>
    <li><a href="#" title="">PHP</a></li>
    <li><a href="#" title="">CSS</a></li>
    <li><a href="#" title="">Javascript</a></li>
    <li><a href="#" title="">Wordpress</a></li> 	
  </ul>
</div>
<div class="job-status-bar">
  <ul class="like-com">
    <li>
      <a href="#"><i onclick="myFunction(this)" class="fa fa-heart"></i>
      </a>
      <img src="images/liked-img.png" alt="">
      <span>${el.likeCount}</span>
    </li> 
    <li><a href="#" title="" class="com"><img src="images/com.png" alt="">Retweets: ${
      el.retweetCount
    }</a></li>
  </ul>
  <a onclick="removeTweet(${idx})"><i class="la la-eye"></i>Delete</a>
  ${renderComments(el.retweets)}
</div>
</div> `;
}

function myFunction(x) {
  x.classList.toggle("fa-heart-o");
  // var z = document.getElementById("likeToggle");
  // if (z.innerHTML === "Like") {
  //   zx.innerHTML = "Unlike";
  // } else {
  //   z.innerHTML = "Like";
  }




function renderComments(retweets) {
  return retweets.map((retweet) => {
    return `<h1>I'm a retweet</h1>`
  }).join('')

}
renderTweets(tweets);