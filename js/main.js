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

  var SUCCESS_MESSAGE = "Thank you! Your request has been received. A Wolf Business Solutions representative will contact you shortly.";
  var ERROR_MESSAGE = "Something went wrong. Please call us at 954-228-4494 or try again.";

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
        status.textContent = SUCCESS_MESSAGE;
        status.setAttribute("data-state", "success");
        form.reset();
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
            status.textContent = SUCCESS_MESSAGE;
            status.setAttribute("data-state", "success");
            form.reset();
          } else {
            status.textContent = ERROR_MESSAGE;
            status.setAttribute("data-state", "error");
          }
        })
        .catch(function () {
          status.textContent = ERROR_MESSAGE;
          status.setAttribute("data-state", "error");
        });
    });
  }

  handleForm("consultForm", "consultFormStatus", null);
  handleForm("supportForm", "supportFormStatus", null);
})();
