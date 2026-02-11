let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")

function createAndAppendSearchResult(result){
  
  let {title,description,link} = result

  // 1. Div Container  -- result item
  
  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");
  searchResultsEl.appendChild(resultItemEl);

  // Ancher Title -- result title

  let titleEl = document.createElement("a");
  titleEl.href = link
  titleEl.classList.add("result-title");
  titleEl.target = "_blank";
  titleEl.textContent = title;
  resultItemEl.appendChild(titleEl);

  // Title Break 

  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  // Anchor URL 

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.textContent = link;
  urlEl.target = "_blank";
  resultItemEl.appendChild(urlEl);

  // Line Break 

  let lineBreakEl = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl);


  // paragraph description 

  let paragraphEl = document.createElement("p");
  paragraphEl.classList.add("link-description");
  paragraphEl.textContent = description;
  resultItemEl.appendChild(paragraphEl);


}


function displayResults(search_results){
  spinnerEl.classList.add("d-none");
  for(let result of search_results){
    createAndAppendSearchResult(result);
  }
}

function searchWikipida(event){
    if(event.key === "Enter"){
      spinnerEl.classList.remove("d-none");
      searchResultsEl.textContent = "";
      let searchInput = searchInputEl.value;
      let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;


      let options = {
        method: "GET"
      };

      fetch(url,options)
      .then(
        function(response){
          return response.json();
        })
      .then(
        function(jsonData){
          let {search_results} = jsonData;
          displayResults(search_results);
      })
    }
}


searchInputEl.addEventListener("keydown", searchWikipida);