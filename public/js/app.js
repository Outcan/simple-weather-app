(function() {
  const weatherForm = document.querySelector("form");
  const messageOne = document.querySelector("#message-1");
  const messageTwo = document.querySelector("#message-2");
  const icon = document.querySelector("#icon");

  weatherForm.addEventListener("submit", event => {
    event.preventDefault();
    const address = weatherForm.elements[0].value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch("/weather?address=" + encodeURIComponent(address)).then(response => {
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
          icon.setAttribute("data-icon", data.icon);
        }
      });
    });
  });
})();
