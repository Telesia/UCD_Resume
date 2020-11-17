/* create a function to match your oninput event for your textbox
which will fetch info from github. use jquery syntax to create a variable
"username" and then select the value .val() put into the input box which ID is
#gh-username.*/

//This function is to display the API data from Github onto our screen. We are literally writing html with a few template literal variables etc inside

function userInformationHTML(user) { //the 'user' parameter here references the user object being returned from the github API. this contains information methods like user's name login name etc.
//could console.log(user) to see all the different things in user object from github data API that you could display.
    return `<h2>${user.name}
                <span class="small-name">
                    (@<a href="${user.html_url}" target= "_blank">${user.login}</a>)
                </span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url} target= "_blank" 
                        <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
                    </a>
                </div>
                <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
            </div>`;
}

// function to render repo info to html
function repoInformationHTML(repos) {
    if (repos.length === 0) { //if data not return (no repos found) then the array of that data = 0 and we want to return a comment
        return `<div class="clearfix repo-list">No Repos!</div>`
    }
    //if data is returned then we need to loop through the array so create a varible to store it
    let listItemsHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html(""); // need to add an empty string to the div to clear it after each github user search :)
    $("#gh-repo-data").html("");
    var username = $("#gh-username").val();
    if(!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub Username</h2>`);
        return; //return word stops function. we have added this because if textbox empty,
        //want prompt to run reminder text and nothing further. don't want the rest of function
        //code calling to github api to run regardless.
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..."/> </div>`);

    //using juqery .when() method to form a promise. So, when get api from github in JSON format, add value of username put in input box.
    //.then() display this in gh-user-data div so need a function

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse)//two responses, which is the arguement of this function. Two JSON calls require 2 responses. It is a placeholder for the information we will receive back from the api- it means the response from get JSON method 
            {let userData = firstResponse[0]; // when using two or more calls in the .when() method, it packs the data into the first elemet of an array, 0, so need to add that to the end of our variable so it has somewhere to go.
            let repoData = secondResponse[0]; //store response arguement into a variable called userData
            $("#gh-user-data").html(userInformationHTML(userData)); //this targets the data from the github api via the function - userInformationHTMl above and puts in the html ID #gh-user-data
            $("#gh-repo-data").html(repoInformationHTML(repoData));

        }, function(errorResponse){// pass in errorResponse as placeholder argument if no response is found need to show an appropriate error message. It'll show 404 not found so then can flash up some text to correspond.
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for username ${username}</h2>`);
            }

            /*else(errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            }*/
            else {
                console.log(errorResponse); //if not a 404 then log the errorResponse to the console
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

//this piece of code below will mean that the octocat (github's avatar user) will display as a generic example of the search box we created.
$(document).ready(fetchGitHubInformation);

