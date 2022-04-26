import fetch from 'cross-fetch';

export async function Get(url) {
  let res = await fetch(url);
  return handleResult(res).catch(error => {
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