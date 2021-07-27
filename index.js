const netscape = require('netscape-bookmarks')
const {exec} = require('child_process')
fs = require('fs')

// You need to be logged in gcloud to execute this function
exec('gcloud projects list --format json', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
    return
  }

  const projects = JSON.parse(stdout)
  //console.log(projects)

  let bookmarks = {}
  projects.forEach(p => {
    const id = p.projectId
    const name = id.replaceAll('-', ' ')
    bookmarks[`${name} auth`] = `https://console.firebase.google.com/project/${id}/authentication/users`
    bookmarks[`${name} db`] = `https://console.firebase.google.com/project/${id}/firestore/data`
    bookmarks[`${name} functions`] = `https://console.firebase.google.com/project/${id}/functions`
    bookmarks[`${name} hosting`] = `https://console.firebase.google.com/project/${id}/hosting/sites`
  })

  const html = netscape(bookmarks)
  console.log(html)

  fs.writeFile('bookmark.html', html, function (err) {
    if (err) return console.log(err);
    exec('open .')
  });
})

