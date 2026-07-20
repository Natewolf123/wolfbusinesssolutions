(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Lightweight client-side form handling.
  // NOTE: This is a static site with no backend. Replace the "endpoint"
  // values below with a real form endpoint (e.g. Formspree, a serverless
  // function, or your CRM's webhook) to actually receive submissions.
  function handleForm(formId, statusId, endpoint) {
    var form = document.getElementById(formId);
    var status = document.getElementById(statusId);
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!endpoint) {
        status.textContent = "Thanks! This form isn't connected to a server yet -- add a form endpoint in js/main.js to start receiving submissions.";
        status.setAttribute("data-state", "error");
        return;
      }

      var data = new FormData(form);
      status.textContent = "Sending...";
      status.removeAttribute("data-state");

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Thanks! We received your request and will be in touch soon.";
            status.setAttribute("data-state", "success");
            form.reset();
          } else {
            status.textContent = "Something went wrong. Please call us at 954-228-4494 or try again.";
            status.setAttribute("data-state", "error");
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please call us at 954-228-4494 or try again.";
          status.setAttribute("data-state", "error");
        });
    });
  }

  // Set these to a real endpoint when one is available.
  handleForm("consultForm", "consultFormStatus", null);
  handleForm("supportForm", "supportFormStatus", null);
})();
