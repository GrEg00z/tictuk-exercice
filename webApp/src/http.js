import fetch from 'cross-fetch';

export async function Get(url) {
  return fetch(url)
    .then(res => {
      return handleResult(res)
    })
    .catch(error => {
      return { error };
    })
}

export async function Post(url, requestOption, returningFileName) {
  return fetch(url, requestOption)
    .then(res => {
      if(returningFileName)
        return downloadFile(res, returningFileName)
      else
        return handleResult(res)
    })
    .catch(error => {
      return { error };
    })
}

export async function Put(url, requestOption) {
  return fetch(url, requestOption)
    .then(res => {
      return handleResult(res)
    })
    .catch(error => {
      return { error };
    })
}

export async function Delete(url, requestOption) {
  return fetch(url, requestOption)
    .then(res => {
      return handleResult(res)
    })
    .catch(error => {
      return { error };
    })
}

async function handleResult(res) {
  // Will work only if response data is in JSON format
  // If need to work with other response format, need to use the appropriate api (ex : .text(), .blob(), ...)
  // and add new handleResult method according
  if(res.status === 200) {
    return await res.json();
  }

  // If response statut differ from 200 (400)
  else {
    return res.text().then((body) => {
      throw new Error(body);
    })
  }
}

function downloadFile(res, fileName) {
  res.blob().then((blob) => {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
    a.click();    
    a.remove();  //afterwards we remove the element again    
  })

  return res;
}