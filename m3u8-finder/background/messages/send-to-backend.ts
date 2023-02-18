import axios from 'axios'

import type { PlasmoMessaging } from '@plasmohq/messaging'

import type { Video } from '~models/model.types'
import type { PostVideo } from '~models/request.types'

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response // parses JSON response into native JavaScript objects
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const video = req.body as Video
  if (video) {
    const request: PostVideo = {
      url: video.url,
      name: video.title,
      sourcePageUrl: video.pageUrl
    }

    const res = await postData('https://localhost:7109/videos', request).then(
      (data) => {
        console.log(data) // JSON data parsed by `data.json()` call
      }
    )
  }

  res.send('add to backend success')
}

export default handler
