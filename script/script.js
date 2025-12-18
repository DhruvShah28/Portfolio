window.onload = () => {

  const links = document.querySelectorAll('.animate_link');

  const skill_toggle = document.getElementById("skill_toggle");
  const skill_area = document.getElementById("skill_area");
  const skill_text = document.getElementById("sk_toggle_text");
  const skill_arrow = document.querySelectorAll(".sk_arrows");

  const footer_date = document.querySelector(".foot_date");

  const current_date = new Date(); 
  current_date.setDate(current_date.getDate() - 2); 

  const text_date = current_date.toDateString('en-US');

  const day = current_date.getDate();           
  const month = current_date.getMonth() + 1;    
  const year = current_date.getFullYear();      

  footer_date.innerHTML = "Last Updated: " + day + "/" + month + "/" + year;

  const scroll_text = document.getElementById("scroll_content");

  const formhandler = document.forms.contact_form;

  const aboutSection = document.getElementById('about');
  
  if(formhandler){
    let name = formhandler.name;
    let email = formhandler.email;
    let message = formhandler.message;
    const errorSection = document.querySelector("#err_sec");
    const error = document.querySelector("#error_text");
    
    const name_regex = /^[A-Za-z ]+$/;
    const email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    formhandler.onsubmit = (e) => {
      
    if(name.value === "" || !name_regex.test(name.value)){
      name.style.borderColor = "red";
      name.focus();
      errorSection.style.display = "block";
      error.innerHTML = "Please Enter a Valid First Name";
      return false;
    }else{
      name.style.borderColor = "revert"
      errorSection.style.display = "none";
    }
    if(email.value === "" || !email_regex.test(email.value)){
      email.style.borderColor = "red";
      email.focus();
      errorSection.style.display = "block";
      error.innerHTML = "Please Enter a Valid Email";
      return false;
    }else{
      email.style.borderColor = "revert"
      errorSection.style.display = "none";
    }
    if(message.value === ""){
      message.style.borderColor = "red";
      message.focus();
      errorSection.style.display = "block";
      error.innerHTML = "Please Enter a Valid First Name";
      return false;
    }else{
      message.style.borderColor = "revert"
      errorSection.style.display = "none";
    }
    }

  }

    if (aboutSection) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          alert('You entered the About section!');
          // Stop observing so alert fires only once (remove if you want repeated triggers)
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // trigger when 50% of the section is visible
      // you can tweak threshold (0.2 = 20% visible, 0 = any part visible)
    });

    io.observe(aboutSection);
  }
  
  skill_toggle.onclick = () =>{
    accordian(skill_area);
    skill_arrow.forEach(e => {
      if(e.classList.contains("turn-up"))
      {
        e.classList.remove("turn-up");
      }else
      {
        e.classList.add("turn-up");
      }
    });
      setTimeout(() => {
      const cur = (skill_text.textContent || "").trim();
      if (cur === "View") {
        skill_text.textContent = "Hide";
      } else {
        skill_text.textContent = "View";
      }
    }, 450);
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', e => {
      const dir = getHoverDirection(e, link);

      // Reset previous states
      link.classList.remove(
        'fill-left', 'fill-right', 'fill-top', 'fill-bottom',
        'out-left', 'out-right', 'out-top', 'out-bottom'
      );

      // Add entry animation
      link.classList.add('fill-' + dir);
    });

    link.addEventListener('mouseleave', e => {
      const dir = getHoverDirection(e, link); // detect exit direction now

      // Remove entry animation and trigger exit
      link.classList.remove('fill-left', 'fill-right', 'fill-top', 'fill-bottom');
      link.classList.add('out-' + dir);

      // Cleanup classes after animation duration
      setTimeout(() => {
        link.classList.remove('out-left', 'out-right', 'out-top', 'out-bottom');
      }, 400);
    });
  });
};


// Helper: determine direction ('top', 'bottom', 'left', 'right')
function getHoverDirection(e, element) {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const w = rect.width;
  const h = rect.height;

  const fromTop = y < h / 4;
  const fromBottom = y > (h * 3) / 4;
  const fromLeft = x < w / 4;
  const fromRight = x > (w * 3) / 4;

  if (fromTop) return 'top';
  if (fromBottom) return 'bottom';
  if (fromLeft) return 'left';
  return 'right';
}

function accordian(area) {
      if (area.style.maxHeight) {
      area.style.maxHeight = null;
      area.classList.remove("open");
    } else {
      area.style.maxHeight = area.scrollHeight + "px";
      area.classList.add("open");
    }
}