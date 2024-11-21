self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  




// --- SETUP START ---
const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: ".smooth-scroll" });
  // --- SETUP END ---








// // Initialize GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    // gsap.registerPlugin(ScrollTrigger);

    // const stickyCards = document.querySelectorAll('.sticky-card');
    // const stickyTexts = document.querySelectorAll('.sticky-text'); // Assuming sticky-text is the text container of each card
    
    // // Set up stagger animation for each card to appear one by one
    // gsap.fromTo(stickyCards, {
    //     opacity: 0,    // Start as invisible
    //     yPercent: 100, // Start each card below the viewport
    // }, {
    //     opacity: 1,    // Fade in as visible
    //     yPercent: 0,   // Move to the normal position
    //     stagger: 0.8,  // Delay each card's animation by 0.5s to create the sequential effect
    //     scrollTrigger: {
    //         trigger: ".sticky-section",
    //         start: "top top",  // Trigger when the section enters view
    //         end: "+=900%",     // Trigger animations over a longer scroll distance
    //         scrub: true,       // Smooth animation while scrolling
    //         pin: true,         // Pin the section while scrolling
    //         markers: true,     // Enable markers to debug ScrollTrigger positions
    //         onUpdate: (self) => {
    //             // Check if the next card is coming into the view
    //             stickyCards.forEach((card, index) => {
    //                 const text = stickyTexts[index];
    
    //                 // Fade out the text of the previous card when the next card is moving in
    //                 if (self.progress > (index * 0.2) && self.progress < ((index + 1) * 0.2)) {
    //                     gsap.to(text, { opacity: 1 });
    //                 } else {
    //                     gsap.to(text, { opacity: 0.0 });
    //                 }
    //             });
    //         }
    //     }
    // });
    
    // gsap.registerPlugin(ScrollTrigger);

    // const stickyCards = document.querySelectorAll('.sticky-card');
    // const stickyTexts = document.querySelectorAll('.sticky-text');
    
    // // Animation for the cards (fading in and stacking)
    // gsap.fromTo(
    //   stickyCards,
    //   {
    //     opacity: 0, // Initially hidden
    //     yPercent: 100, // Start below the viewport
    //   },
    //   {
    //     opacity: 1, // Fully visible
    //     yPercent: 0, // Move to center
    //     stagger: 0.8, // Delay between each card animation
    //     scrollTrigger: {
    //       trigger: ".sticky-section",
    //       start: "top top", // Trigger when section enters viewport
    //       end: "+=900%", // Longer scroll distance for all animations
    //       scrub: true, // Smooth animation while scrolling
    //       pin: true, // Keep the section pinned during animation
    //       markers: true, // Debugging markers
    //     },
    //   }
    // );
    
    // // Animation for each sticky-text element associated with each sticky-card
    // stickyCards.forEach((card, index) => {
    //   const text = stickyTexts[index]; // Match the text with the card by index
    
    //   if (text) {
    //     gsap.fromTo(
    //       text,
    //       { opacity: 1 }, // Start fully visible
    //       {
    //         opacity: 0, // Gradually fade out
    //         scrollTrigger: {
    //           trigger: card, // Trigger the specific card
    //           start: "top center", // Fade when the card is in the center of the viewport
    //           end: "bottom center", // Fully fade out as the card exits the center
    //           scrub: true, // Smooth animation with scrolling
    //           markers: true, // Markers for debugging, specific to each sticky-text
    //         },
    //       }
    //     );
    //   }
    // });
    
    
    // gsap.registerPlugin(ScrollTrigger);

    // const stickyCards = document.querySelectorAll('.sticky-card');
    // const stickyTexts = document.querySelectorAll('.sticky-text');
    
    // // Function to handle class switching for active, previous, and next cards
    // function updateCardClasses() {
    //   stickyCards.forEach((card, index) => {
    //     const cardRect = card.getBoundingClientRect();
    //     const cardCenter = cardRect.top + cardRect.height / 2; // Center of the card
    
    //     // Check if the card is in the center of the viewport
    //     if (cardCenter > window.innerHeight * 0.25 && cardCenter < window.innerHeight * 0.75) {
    //       card.classList.add('active');
    //       card.classList.remove('previous', 'next');
          
    //       // Add 'previous' class to the card before
    //       if (index > 0) {
    //         stickyCards[index - 1].classList.add('previous');
    //       }
          
    //       // Add 'next' class to the card after
    //       if (index < stickyCards.length - 1) {
    //         stickyCards[index + 1].classList.add('next');
    //       }
    //     } else {
    //       card.classList.remove('active');
          
    //       // Remove 'previous' and 'next' classes from other cards
    //       if (index > 0) {
    //         stickyCards[index - 1].classList.remove('previous');
    //       }
    //       if (index < stickyCards.length - 1) {
    //         stickyCards[index + 1].classList.remove('next');
    //       }
    //     }
    //   });
    // }
    
    // // Function to handle the opacity of the sticky text elements
    // function updateTextOpacity() {
    //   stickyCards.forEach((card, index) => {
    //     const text = stickyTexts[index];
    //     const cardRect = card.getBoundingClientRect();
    //     const cardCenter = cardRect.top + cardRect.height / 2;
    
    //     // Check if the card is in the center of the viewport
    //     if (cardCenter > window.innerHeight * 0.25 && cardCenter < window.innerHeight * 0.75) {
    //       // Fade in the text for the active card
    //       gsap.to(text, { opacity: 1, duration: 0.5 });
    //     } else {
    //       // Fade out the text for the non-active cards
    //       gsap.to(text, { opacity: 0, duration: 0.5 });
    //     }
    //   });
    // }
    
    // // Scroll-triggered animations for the cards
    // gsap.fromTo(
    //   stickyCards,
    //   {
    //     opacity: 0, // Initially hidden
    //     yPercent: 100, // Start below the viewport
    //   },
    //   {
    //     opacity: 1, // Fully visible
    //     yPercent: 12, // Move to center
    //     stagger: 0.8, // Delay between each card animation
    //     scrollTrigger: {
    //       trigger: ".sticky-section",
    //       start: "top top", // Trigger when section enters viewport
    //       end: "+=750%", // Longer scroll distance for all animations
    //       scrub: true, // Smooth animation while scrolling
    //       pin: true, // Keep the section pinned during animation
    //       markers: true, // Debugging markers
    //       onUpdate: updateCardClasses, // Update card classes on scroll
    //     },
    //   }
    // );
    
    // // Scroll-triggered animations for each sticky-text element associated with each sticky-card
    // gsap.utils.toArray(stickyTexts).forEach((text, index) => {
    //   gsap.fromTo(
    //     text,
    //     { opacity: 0 }, // Start fully invisible
    //     {
    //       opacity: 1, // Fade in the text when in view
    //       scrollTrigger: {
    //         trigger: stickyCards[index], // Trigger the specific card
    //         start: "top center", // Start when the card reaches the center of the viewport
    //         end: "bottom center", // End when the card exits the center
    //         scrub: true, // Smooth animation with scrolling
    //         markers: true, // Debugging markers for each sticky-text
    //         onUpdate: updateTextOpacity, // Update text opacity based on the card's visibility
    //       },
    //     }
    //   );
    // });
    
    
    
    


    // gsap.registerPlugin(ScrollTrigger);

    // const stickyCards = document.querySelectorAll('.sticky-card');
    // const stickyTexts = document.querySelectorAll('.sticky-text');
    
    // // Initialize cards with proper spacing and opacity
    // stickyCards.forEach((card, index) => {
    //   gsap.set(card, { opacity: 0.8, y: 0 }); // Ensure initial opacity and position
    // });
    
    // // Function to handle class switching for active, previous, and next cards
    // function updateCardClasses() {
    //   stickyCards.forEach((card, index) => {
    //     const cardRect = card.getBoundingClientRect();
    //     const cardCenter = cardRect.top + cardRect.height / 2; // Center of the card
        
    //     // Check if the card is in the center of the viewport
    //     if (cardCenter > window.innerHeight * 0.25 && cardCenter < window.innerHeight * 0.75) {
    //       card.classList.add('active');
    //       card.classList.remove('previous', 'next');
          
    //       // Add 'previous' class to all cards before the active card and adjust gap
    //       stickyCards.forEach((previousCard, prevIndex) => {
    //         if (prevIndex < index) {
    //           previousCard.classList.add('previous');
    //           // Apply a dynamic gap for all previous cards (20px for each card)
    //           gsap.to(previousCard, {
    //             y: -((index - prevIndex) * 20), // Negative value to move up
    //             opacity: 0.6, // Reduce opacity for previous cards
    //             duration: 0.3,
    //           });
    //         }
    //       });
          
    //       // Add 'next' class to the card after
    //       if (index < stickyCards.length - 1) {
    //         stickyCards[index + 1].classList.add('next');
    //       }
    //     } else {
    //       card.classList.remove('active');
    //       card.classList.remove('previous');
    //       card.classList.remove('next');
          
    //       // Reset transform and opacity for non-active cards
    //       gsap.to(card, {
    //         y: 0, // Reset the position
    //         opacity: 0.8, // Reset opacity
    //         duration: 0.3,
    //       });
    //     }
    //   });
    // }
    
    // // Function to handle the opacity of the sticky text elements
    // function updateTextOpacity() {
    //   stickyCards.forEach((card, index) => {
    //     const text = stickyTexts[index];
    //     const cardRect = card.getBoundingClientRect();
    //     const cardCenter = cardRect.top + cardRect.height / 2;
        
    //     // Check if the card is in the center of the viewport
    //     if (cardCenter > window.innerHeight * 0.25 && cardCenter < window.innerHeight * 0.75) {
    //       // Fade in the text for the active card
    //       gsap.to(text, { opacity: 1, duration: 0.5 });
    //     } else {
    //       // Fade out the text for the non-active cards
    //       gsap.to(text, { opacity: 0, duration: 0.5 });
    //     }
    //   });
    // }
    
    // // Scroll-triggered animations for the cards
    // gsap.fromTo(
    //   stickyCards,
    //   {
    //     opacity: 0, // Initially hidden
    //     yPercent: 100, // Start below the viewport
    //   },
    //   {
    //     opacity: 1, // Fully visible
    //     yPercent: 12, // Move to center
    //     stagger: 0.8, // Delay between each card animation
    //     scrollTrigger: {
    //       trigger: ".sticky-section",
    //       start: "top top", // Trigger when section enters viewport
    //       end: "+=750%", // Longer scroll distance for all animations
    //       scrub: true, // Smooth animation while scrolling
    //       pin: true, // Keep the section pinned during animation
    //       markers: true, // Debugging markers
    //       onUpdate: updateCardClasses, // Update card classes on scroll
    //     },
    //   }
    // );
    
    // // Scroll-triggered animations for each sticky-text element associated with each sticky-card
    // gsap.utils.toArray(stickyTexts).forEach((text, index) => {
    //   gsap.fromTo(
    //     text,
    //     { opacity: 0 }, // Start fully invisible
    //     {
    //       opacity: 1, // Fade in the text when in view
    //       scrollTrigger: {
    //         trigger: stickyCards[index], // Trigger the specific card
    //         start: "top center", // Start when the card reaches the center of the viewport
    //         end: "bottom center", // End when the card exits the center
    //         scrub: true, // Smooth animation with scrolling
    //         markers: true, // Debugging markers for each sticky-text
    //         onUpdate: updateTextOpacity, // Update text opacity based on the card's visibility
    //       },
    //     }
    //   );
    // });
    
// FINAL WORKING PINED SCRIPT START

function stickySectionCards(){
  gsap.registerPlugin(ScrollTrigger);

  const stickyCards = document.querySelectorAll('.sticky-card');
  const stickyTexts = document.querySelectorAll('.sticky-text');
  
  
  stickyCards.forEach((card, index) => {
    gsap.set(card, { opacity: 0, y: 0 });
  });
  
  
  function updateCardClasses() {
    stickyCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2; 
      
      
      if (cardCenter > window.innerHeight * 0.25 && cardCenter < window.innerHeight * 0.75) {
        card.classList.add('active');
        card.classList.remove('previous', 'next');
        
        
        stickyCards.forEach((previousCard, prevIndex) => {
          if (prevIndex < index) {
            previousCard.classList.add('previous');
            
            gsap.to(previousCard, {
              y: -((index - prevIndex) * 20), 
              opacity: 0.6, 
              duration: 0.3,
            });
          }
        });
        
        
        if (index < stickyCards.length - 1) {
          stickyCards[index + 1].classList.add('next');
        }
      } else {
        card.classList.remove('active');
        card.classList.remove('previous');
        card.classList.remove('next');
        
        
        gsap.to(card, {
          y: 0, 
          opacity: 0.8, 
          duration: 0.3,
        });
      }
    });
  }
  
  
  function updateTextOpacity() {
    stickyCards.forEach((card, index) => {
      const text = stickyTexts[index];
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top + cardRect.height / 2;
      
      
      if (cardCenter > window.innerHeight * 0.25 && cardCenter < window.innerHeight * 0.75) {
        
        gsap.to(text, { opacity: 1, duration: 0.5 });
      } else {
        
        gsap.to(text, { opacity: 0, duration: 0.5 });
      }
    });
  }
  
  
  gsap.fromTo(
    stickyCards,
    {
      opacity: 0, 
      yPercent: 90, 
    },
    {
      opacity: 1, 
      yPercent: 17, 
      stagger: 0.2, 
      scrollTrigger: {
        trigger: ".sticky-section",
        start: "top top", 
        end: "+=800%", 
        scrub: 1, 
        pin: true, 
        markers: false, 
        onUpdate: updateCardClasses, 
      },
    }
  );
  
  
  gsap.utils.toArray(stickyTexts).forEach((text, index) => {
    gsap.fromTo(
      text,
      { opacity: 0 }, 
      {
        opacity: 1, 
        scrollTrigger: {
          trigger: stickyCards[index], 
          start: "top center", 
          end: "bottom center", 
          scrub: 2, 
          markers: false, 
          onUpdate: updateTextOpacity, 
        },
      }
    );
  });
}
stickySectionCards();
    
// FINAL WORKING PINED SCRIPT END












    






    
    
    
    

    
















    

    
    
    
    
    
    
    // VIDEO SECTION TL START
    gsap.timeline({
        scrollTrigger: {
            trigger: ".video_scale_animation-main",
            start: "top center",
            end: "top top",
            scrub: true,
            markers: false
        }
    })
    .from(".video_scale_animation video", {
        scale: 1.2
    });
    // VIDEO SECTION TL END



    // IMAGE SCALEING SCRITP START
    
        gsap.timeline({
            scrollTrigger: {
                trigger: ".main__aniamtion__img",
                start: "55% 50%",
                end: "120% 50%",
                scrub: 1,
                markers: false  
            }
        })
        .from(".main__aniamtion__img .img__animation", {
            scaleY: 0,
            height:"0%",
            width:"100%",
            duration:"20",
        })
        .to(".main__aniamtion__img .img__animation", {
            scaleY: 5,
            height:"100%",
            width:"100%",
            duration:"20",
        })

    // IMAGE SCALEING SCRITP END
});
