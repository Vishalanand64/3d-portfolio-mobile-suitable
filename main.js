import * as THREE from "three";
// import { gsap } from "gsap"; // Ensure GSAP is imported
import ScrollTrigger from "gsap/ScrollTrigger"; 
import LocomotiveScroll from 'locomotive-scroll'; 

gsap.registerPlugin(ScrollTrigger);
const innerW = window.innerWidth



const sceneTwo = new THREE.Scene();
const cameraTwo = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
cameraTwo.position.z = 2;

const textureLoader = new THREE.TextureLoader();
let cylinderTexture = textureLoader.load("./final.png");
cylinderTexture.colorSpace = THREE.SRGBColorSpace;
let cylinderGeometry ;
if(innerW >= 500){
 
  cylinderGeometry = new THREE.CylinderGeometry(1.4, 1.4, 0.9, 64, 32, true); 
}else{
  cylinderGeometry = new THREE.CylinderGeometry(0.8, 1.1, 0.8, 64, 32, true); 
}

const cylinderMaterial = new THREE.MeshBasicMaterial({ 
  map: cylinderTexture,
  transparent: true,
  side: THREE.DoubleSide
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.rotation.x = 0.4;


cylinder.position.y = 0.35;
sceneTwo.add(cylinder);

const canvasTwo = document.querySelector(".project-upper");
const rendererTwo = new THREE.WebGLRenderer({ canvas: canvasTwo, antialias: true });
rendererTwo.setSize(canvasTwo.clientWidth, canvasTwo.clientHeight);
rendererTwo.render(sceneTwo, cameraTwo);

rendererTwo.toneMapping = THREE.ACESFilmicToneMapping;

window.addEventListener('resize', () => {
  cameraTwo.aspect = canvasTwo.clientWidth / canvasTwo.clientHeight;
  cameraTwo.updateProjectionMatrix();
  rendererTwo.setSize(canvasTwo.innerWidth, canvasTwo.innerHeight);
  rendererTwo.render(sceneTwo, cameraTwo);
});

const animateCylinder = () => {
  window.requestAnimationFrame(animateCylinder);
  cylinder.rotation.y += 0.005;
  rendererTwo.render(sceneTwo, cameraTwo);
};
animateCylinder();


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#wrapper"),
  smooth: true,
  lerp: 0.1,
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#wrapper", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


const loading = document.querySelector(".loading");
const interval = setInterval(() => {
  let count = parseInt(loading.textContent);

  if (count < 100) {
    count += 1;
    loading.textContent = count;
  } else {
    clearInterval(interval);
    gsap.to(".loader", {
      y: "-100%",
      duration: 1.5,
      opacity:0
    });
  }
}, 12);





const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-page",
    scroller: "#wrapper", 
    start: "40% 100%",  
    end: "50% 40%",  
    toggleActions: "play none none none",
    scrub: 3,       
       
  }
});

tl.from(".web-dev", { 
  x: "-110%",    
  duration: 1, 
  opacity: 0,    
})
  .from(".designer", {
    x: "110%",   
    duration: 1,  
    opacity: 0,   
  }, "-=0.8");   


  


if(innerW >= 400){
  const skills = document.querySelectorAll(".skill");
  skills.forEach((elem) => {
    elem.addEventListener("mousemove", (e) => {
      let xVelocity = e.movementX;
      let rotation = gsap.utils.clamp(-15, 15, xVelocity);
      let image = elem.querySelector("img");
      gsap.to(image, {
        opacity: 1,
        x: e.clientX - 150,
        rotate: rotation
      });
    });
    elem.addEventListener("mouseleave", (e) => {
      let image = elem.querySelector("img");
      gsap.to(image, {
        opacity: 0,
      });
    });
  });
}


document.querySelectorAll('details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open) {
      document.querySelectorAll('details').forEach((otherDetails) => {
        if (otherDetails !== details) {
          otherDetails.open = false;
        }
      });
    }
  });
});

const leftStrip = document.querySelector(".left-strip")

const tl2 = gsap.timeline({
  scrollTrigger:{
    scroller: "#wrapper",
    trigger : ".skill-overflow",
    start:"10% 100%",
    scrub:3,
  
  }
})
tl2.to(leftStrip , {
  height: "100%",

  duration:1,
 
})

const heroImg = document.querySelector(".hero-image")

gsap.to(heroImg , {
  y:20,
  duration:1,
  repeat:-1,
  yoyo:1
})

if (innerW >= 400) {
  animateCards("y", "-100%");
} else {
  animateCards("x", "-100%");
}

function animateCards(axis, value) {
  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.from(card, {
      [axis]: value,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        scroller: "#wrapper",
        trigger: card,
        scrub: 2,
        start: axis === "y" ? "0% top" : "-50% 70%",
        end: "0% bottom",
      },
    });
  });
}

const bgArr = ["./cynthia.jpg" , "./zajno.jpg" , "./3dearth.jpg" , "./lazarev.jpg" , "./codeReview.jpg"]

gsap.utils.toArray(".project-card").forEach((card, index) => {
 
  
  gsap.to(card , {
    backgroundImage: `url(${bgArr[index]})`,
    backgroundPosition : "centre centre",
    backgroundSize:"cover",
    zIndex:`${10 - index}`

  })
    
  })

  document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    
    sendButton.addEventListener('click', function() {
      // Get form values
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const phone = document.getElementById('contactPhone').value;
      const message = document.getElementById('contactMessage').value;
      
      // Create contact object
      const contactData = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };
      
      // Log to console
      console.log('Contact Form Submission:', contactData);
      
      if(contactData.name && contactData.email && contactData.phone && contactData.message){

        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for contacting me. I will get back to you soon.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }else{
        Swal.fire({
          title: 'Error',
          text: 'All fields are required!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      
     
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactPhone').value = '';
      document.getElementById('contactMessage').value = '';
    });
  });