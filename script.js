let selectedAttendance = "";

const openingScreen =
    document.getElementById("openingScreen");

const openingContent =
    document.getElementById("openingContent");

const invitation =
    document.getElementById("invitation");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


// =================================
// OPEN INVITATION
// =================================

openInvitation.addEventListener("click", async function () {

    openingScreen.classList.add("open");

    openingContent.style.opacity = "0";
    openingContent.style.transform = "scale(.9)";

    // Music starts only after user interaction.
    // This works better with Chrome autoplay rules.

    try {

        music.volume = 0.35;

        await music.play();

        musicButton.textContent = "♫";
        musicButton.classList.add("playing");

    } catch (error) {

        console.log("Music was not started:", error);

    }


    setTimeout(function () {

        openingScreen.style.display = "none";

        invitation.style.display = "block";

        musicButton.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        checkReveal();

    }, 2100);

});


// =================================
// MUSIC BUTTON
// =================================

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicButton.textContent = "♫";

        musicButton.classList.add("playing");

    } else {

        music.pause();

        musicButton.textContent = "♩";

        musicButton.classList.remove("playing");

    }

});


// =================================
// YES
// =================================

document
    .getElementById("yesButton")
    .addEventListener("click", function () {

        selectAttendance(
            "Yes, I'll Attend",
            this
        );

    });


// =================================
// NO
// =================================

document
    .getElementById("noButton")
    .addEventListener("click", function () {

        selectAttendance(
            "No, Unable to Attend",
            this
        );

    });


// =================================
// ATTENDANCE SELECTION
// =================================

function selectAttendance(answer, button) {

    selectedAttendance = answer;


    document
        .querySelectorAll(".attendance")
        .forEach(function (item) {

            item.classList.remove("selected");

        });


    button.classList.add("selected");


    document.getElementById(
        "selectedResponse"
    ).textContent =
        "Your response: " + answer;


    const guestForm =
        document.getElementById("guestForm");


    guestForm.classList.add("show");


    setTimeout(function () {

        guestForm.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 200);

}


/// =================================
// GOOGLE FORM CONFIGURATION
// =================================

const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeVfYXfz7yPNImx3UJQntbzmYkd3ZB1Sri_bOB9420P9gTAHw/formResponse";

const ATTENDANCE_FIELD =
    "entry.1931250263";

const FULL_NAME_FIELD =
    "entry.1931208161";

const FATHER_NAME_FIELD =
    "entry.904287254";


// =================================
// RSVP SUBMISSION
// =================================

document
    .getElementById("submitRSVP")
    .addEventListener("click", async function () {

        const fullName =
            document
                .getElementById("fullName")
                .value
                .trim();

        const fatherName =
            document
                .getElementById("fatherName")
                .value
                .trim();


        // Check YES / NO

        if (!selectedAttendance) {

            alert("Please select YES or NO.");

            return;
        }


        // Check Full Name

        if (!fullName) {

            alert("Please enter your full name.");

            return;
        }


        // Check Father's Name

        if (!fatherName) {

            alert("Please enter your father's name.");

            return;
        }


        const submitButton =
            document.getElementById("submitRSVP");


        submitButton.disabled = true;

        submitButton.textContent =
            "SENDING...";


        // Create data for Google Form

        const formData =
            new FormData();


        formData.append(
            ATTENDANCE_FIELD,
            selectedAttendance
        );


        formData.append(
            FULL_NAME_FIELD,
            fullName
        );


        formData.append(
            FATHER_NAME_FIELD,
            fatherName
        );


        // Send to Google Form

        try {

            await fetch(
                GOOGLE_FORM_URL,
                {
                    method: "POST",
                    mode: "no-cors",
                    body: formData
                }
            );


            // Hide guest form

            document
                .getElementById("guestForm")
                .style.display = "none";


            // Hide YES / NO

            document
                .getElementById("attendanceButtons")
                .style.display = "none";


            // Show thank-you message

            const thankYou =
                document.getElementById("thankYou");


            thankYou.classList.add("show");


            thankYou.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        } catch (error) {

            console.error(
                "RSVP Error:",
                error
            );


            alert(
                "Unable to submit your RSVP. Please try again."
            );


            submitButton.disabled = false;

            submitButton.textContent =
                "SUBMIT RSVP";
        }

    });

// =================================
// SCROLL REVEAL
// =================================

function checkReveal() {

    const reveals =
        document.querySelectorAll(".reveal");


    reveals.forEach(function (element) {

        const position =
            element
                .getBoundingClientRect()
                .top;


        const screenHeight =
            window.innerHeight;


        if (position <
            screenHeight - 80) {

            element.classList.add(
                "visible"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    checkReveal
);

window.addEventListener(
    "resize",
    checkReveal
);