"use strict";
const position = {
    x:0, y:0
}
const container = document.getElementById("container");

const images = ["assets/bubble-sm.svg", "assets/bubble-md.svg", "assets/bubble-lg.svg"];
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomRounds(min, max){
    return Math.round(Math.random() * (max - min) + min);
}
// Function to render images
function renderImages(numImages, imageUrl, containerId, yCenter, e) {
    const container = document.getElementById(containerId);

    for (let i = 0; i < numImages; i++) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.classList.add('absolute');
        image.classList.add('opacity-0');
        image.classList.add("img");

        // Calculate random x coordinate
        const x = getRandom(0, container.clientWidth - image.width - 200);

        // Calculate random y coordinate within the range y-e to y+e
        const y = getRandom(yCenter - e, yCenter + e);

        // Set the image position
        image.style.left = x + 'px';
        image.style.top = y + 'px';

        // Append the image to the container
        container.appendChild(image);
    }
}
for(let i = 1; i < images.length; i++) {
    let index = getRandomRounds(0, images.length - 1);
    renderImages(10, images[index], 'container', 300, 150);
}
const bubbles = document.querySelectorAll('.img');
function floatImage(image) {
    gsap.to(image, {
        duration: Math.random() * 2 + 1, // Random duration between 1 and 3 seconds
        repeat: -1,
        yoyo: true,
        y: () => `+=${Math.random() * 100 - 40}`, // Random movement between -10 and 10 pixels
        ease: "power1.inOut"
    });
}
const afterLoadingAnimations = (bubbles, tl) => {
    bubbles.forEach(image=>{
        floatImage(image);
        function animateOnHover() {
            gsap.to(image, {
                duration: 0.5,
                scaleX: 1.2, // Scale up horizontally
                scaleY: 1.2, // Scale up vertically
                rotationX: 15, // Rotate around the X-axis
                rotationY: 15, // Rotate around the Y-axis
                ease: 'power2.out' // Easing function
            });
        }

        // Function to reset the image to its original state
        function resetOnHoverOut() {
            gsap.to(image, {
                duration: 0.5,
                scaleX: 1, // Reset horizontal scale
                scaleY: 1, // Reset vertical scale
                rotationX: 0, // Reset rotation around the X-axis
                rotationY: 0, // Reset rotation around the Y-axis
                ease: 'power2.out' // Easing function
            });
        }

        // Event listeners for hover in and out
        image.addEventListener('mouseenter', animateOnHover);
        image.addEventListener('mouseleave', resetOnHoverOut);
    })
    gsap.set("#model",{
        top:"-100%"
    })
    gsap.set("#title", {
        top:"-100%",
        position:"absolute",
    })
    tl.add("end").to("#model", {
        top: '10%',
        duration: 1,
        rotate:360,
        ease: 'bounce.out'
    },"end").to("#title",{
        top:0,
        duration: 0.5,
        ease: 'bounce.out'
    }, 'end').fromTo(["#cta", "#trigger1", "#footer"],{
        opacity: 0
    }, {opacity:1});


}

let prevPosition = window.scrollY;
window.addEventListener("scroll",(e)=> {
    position.y = prevPosition;
    window.localStorage.setItem("y", position.y);

    let currentPosition = window.scrollY;
    if (currentPosition > prevPosition && currentPosition > 50) {
        gsap.to("#header", {
            duration: 0.5,
            top: "-40%",
            position:"fixed"
        });
        prevPosition = currentPosition;

    } else if (currentPosition < prevPosition || currentPosition <= 50) {
        gsap.to("#header", {
            duration: 0.5,
            top: 0,
            position:"fixed"
        });
        prevPosition = currentPosition;

    }
});
document.addEventListener("DOMContentLoaded", function() {

    const heart = document.querySelectorAll('.heart');
const heartColor = document.querySelectorAll('.heartColor');
const bagIcon = document.querySelectorAll('.bag-icon');
    const heartbeatAnimation = gsap.to(heart, { scale: 1.1, duration: 0.1, ease: 'sine.out', yoyo: true, repeat: 3, paused: true });
const bagAnimation = gsap.to(bagIcon, {
    rotation: 360,
    duration: 2,
    ease: 'bounce.out'
});
    heart.forEach(el=>el.addEventListener('mouseenter', () => {
        heartbeatAnimation.restart();
        heartColor.forEach(el=>el.style.fill = "red");
    }));
    bagIcon.forEach(el=>el.addEventListener("mouseenter", ()=>{
        bagAnimation.restart();
    }))
heart.forEach(el=>el.addEventListener('mouseleave', () => {
    heartColor.forEach(el=>el.style.fill = "white");
}))
const isMobile = window.innerWidth < 600;
    const mobileMenu = document.querySelector(".menu-icon");
    const closeMobileMenu = document.querySelectorAll(".closeMobileMenu");
    mobileMenu.addEventListener("click", () => {
        // Open menu animation
        gsap.set("#mobileMenu", { zIndex: 105, opacity: 1 });
        gsap.to("#mobileMenuLeft", { opacity: 1 });
        gsap.to("#mobileMenuRight", { width: isMobile?"70%":"50%", ease: "power3.out" });
        gsap.to("#mobileNav", {opacity: 1})
    });

    closeMobileMenu.forEach(el=>el.addEventListener("click", () => {
        // Close menu animation
        gsap.set("#mobileMenu", { zIndex: -1, opacity: 0 });
        gsap.to("#mobileMenuLeft", { opacity: 0 });
        gsap.to("#mobileMenuRight", { width: 0, ease: "power3.in" });
        gsap.to("#mobileNav", {opacity: 0})
    }));


    const scrollButtonLeft = document.querySelector('.scroll-button-left');
    const scrollButtonRight = document.querySelector('.scroll-button-right');

    const scrollButtonLeftCategory = document.querySelector('.scroll-button-left-category');
    const scrollButtonRightCategory = document.querySelector('.scroll-button-right-category');

    const productList = document.querySelector('#product-list');
const categoriesList = document.querySelector("#categories-list");

    productList.addEventListener("scroll", ()=>checkScrollLimit(scrollButtonLeft,scrollButtonRight, productList));

    categoriesList.addEventListener("scroll", ()=>checkScrollLimit(scrollButtonLeftCategory,scrollButtonRightCategory, categoriesList));

    scrollButtonLeft.addEventListener('click', function() {
        productList.scrollBy({ left: -500, behavior: 'smooth' }); // Adjust scroll amount
    });
    scrollButtonRight.addEventListener('click', function() {
        productList.scrollBy({ left: 500, behavior: 'smooth' }); // Adjust scroll amount
    });  scrollButtonLeftCategory.addEventListener('click', function() {
        categoriesList.scrollBy({ left: -500, behavior: 'smooth' }); // Adjust scroll amount
    });
    scrollButtonRightCategory.addEventListener('click', function() {
        categoriesList.scrollBy({ left: 500, behavior: 'smooth' }); // Adjust scroll amount
    });
    const scaleFactor = 0.4;


    window.addEventListener('scroll', () => {
        // Calculate the scaling factor based on the scroll position
        const scrollY = window.scrollY;
        const scale = 1 + (scrollY * scaleFactor) / (window.innerHeight * 5);

        // Apply the scaling using GSAP
        gsap.to("#banner", { duration: 0.5, scale: scale });

    });

    // Call checkScrollLimit initially to set button states
    checkScrollLimit(scrollButtonLeftCategory,scrollButtonRightCategory, categoriesList);

    checkScrollLimit(scrollButtonLeft,scrollButtonRight, productList);
    function checkScrollLimit(scrollButtonLeft, scrollButtonRight, list) {
        const canScrollLeft = list.scrollLeft > 0;
        const canScrollRight = list.scrollLeft + list.clientWidth  < list.scrollWidth - 10;
        // Disable or enable buttons based on scroll limits
        scrollButtonLeft.disabled = !canScrollLeft;
        scrollButtonRight.disabled = !canScrollRight;
    }

    let gsapTl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start:"top+=1px top"
        }
    });
    // Second GSAP timeline (tl)
    let tl = gsap.timeline();
    function checkScrollPosition() {
        const scrollPosition = Number(localStorage.getItem("y")) - 10 || position.y || 0;
        if (50 <= scrollPosition) {
            gsap.set("#main",{
                top: "-150%"
            })
            gsap.set("#logoB", {
                opacity: 0,
                left:"-100%",
            })
            gsap.set("#logoW", {
                opacity: 0,
                left:"-100%",
            });
            gsap.set("#scene",{
                left:0,
                top: 0,
                position: "relative",
            });
            gsap.set(".img",{
                opacity: 1,
            });
            gsap.set("#header",{
                position:"fixed",
                opacity: 1,
                top:0,
            })
            gsap.set(["#trigger1", "#footer"], {
                opacity: 1,
            })
            gsapTl.kill();

            afterLoadingAnimations(bubbles, tl);


        }else{
            gsap.set(["#trigger1", "#footer"],{
                display: "none",
            })

        }
    }
    checkScrollPosition();
    gsap.set("#header",{
        positiion: "absolute",
        top:"-100%",
    })
    gsap.set("#main",{
        opacity: 1,
    })
    gsapTl.fromTo("#main", {
        border: "none",
        width: "100%",
        filter: "brightness(100%)",
        height: "100%",
    }, {
        border: "15px black solid",
        duration: 0.7,
        borderRadius: "2%",
        top:"20%",
        filter: "brightness(50%)",
        width: "60vw",

        height: "70vh",
    });

    gsapTl.add("before").to("#logoW", {
        opacity: 1,
        duration: 0.4,
        delay: 0.5,
    },"before").to("#header",{
        top: 0,
        opacity: 1
    }, "before");

    gsapTl.to(["#trigger1","#footer"], {
        display:"block",
    });

    gsapTl.to("#main", {
        top: "-100%",
    }).to("#logoB", {
        opacity: 1,
    }).to("#logoW", {
        opacity: 0,
        duration: 0.4,
    })

    gsapTl.eventCallback("onComplete", function() {
        tl.add("middle").to("#scene", {
            left: 0,
            ease: "power1.out",
        }, "middle").to("#logoB", {
            left: "-100%",
            ease: "power4.out",
        },"middle").to(".img",{
            opacity: 1,
            delay: 1,
            ease: "power3.out",
        }, "middle");
        tl.add("next-middle").to("#scene", {
            duration: 1,
            top: 0,
            position: "relative",
        }, "next-middle").to(window, { scrollTo: 0 }, "next-middle");
        afterLoadingAnimations(bubbles, tl);
    })
    const scrollPosition = localStorage.getItem("y") || position.y || 0;
    if(scrollPosition > 50){
        afterLoadingAnimations(bubbles, tl);
    }
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        gsap.set(product, {
            y: -60,
            scale: 0.5,
            opacity: 0
        })
    })
    tl.to(products, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power1.inOut",
            stagger: {
                axis: "x",
                ease: "power1.in",
                from: 'start'
            },
            scrollTrigger:{
                trigger:".product-list",
                start:"top center"
            },
        },
    );
});
