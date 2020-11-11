/* create a function to match your oninput event for your textbox
which will fetch info from github. use jquery syntax to create a variable
"username" and then select the value .val() put into the input box which ID is
#gh-username.*/

function userInformationHTML(user) { //the 'user' parameter here references the user object being returned from the github API. this contains information methods like user's name login name etc.
//could console.log(user) to see all the different things in user object from github data API that you could display.
    return `<h2>${user.name}
                <span class="small-name">
                    (@<a href="${user.html_url}" target= "_blank">${user.login}</a>)
                </span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url} target="_blank" 
                        <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                    </a>
                </div>
                <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
            </div>`;
}

console.log(user);


function fetchGitHubInformation() {
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
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response)//response is the arguement of this function. It is a placeholder for the information we will receive back from the api- it means the response from get JSON method 
            {let userData = response; //store response arguement into a variable called userData
            $("#gh-user-data").html(userInformationHTML(userData));

        }, function(errorResponse){// pass in errorResponse as placeholder argument if no response is found need to show an appropriate error message. It'll show 404 not found so then can flash up some text to correspond.
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for username ${username}</h2>`);
            }
            else {
                console.log(errorResponse); //if not a 404 then log the errorResponse to the console
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}