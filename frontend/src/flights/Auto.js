

const autocomplete = (input, datalist, cityCodes) => {
    clearTimeout(autocompleteTimeoutHandle);
    autocompleteTimeoutHandle = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ keyword: input.value });
        const response = await fetch(`/api/autocomplete?${params}`);
        const data = await response.json();
        datalist.textContent = "";
        data.forEach((entry) => {
          cityCodes[entry.name.toLowerCase()] = entry.iataCode;
          datalist.insertAdjacentHTML(
            "beforeend",
            `<option value="${entry.name}"></option>`
          );
        });
      } catch (error) {
        console.error(error);
      }
    }, autocompleteTimeout);
  };

  let destinationCityCodes = {};
  let originCityCodes = {};

originInput.addEventListener("input", () => {
    if (originInput) {
      autocomplete(originInput, originOptions, originCityCodes);
    }
  });
  destinationInput.addEventListener("input", () => {
    if (destinationInput) {
      autocomplete(destinationInput, destinationOptions, destinationCityCodes);
    }
  });