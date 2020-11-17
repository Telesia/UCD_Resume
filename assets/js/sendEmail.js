//Craete function that connects to the onsubmit on contact form. We are passing in the contact form
//as a parameter inside the function braces - we are going to make up a name for it and call it contactForm here
//then use the emailjs.send method from their website. 
//Pass in the service and email template id from the Emailjs website.
//then create an object using key and value pairs which are our parameters e.g. from_name= to the parameter names in our email template in EmailJS. 
function sendMail(contactForm) {
    emailjs.send("service_htxlx5m", "template_8d7wu5l", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });
        return false; //To block from loading a new page
} 

//FYI this code works and was successfully set up :)