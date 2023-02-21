import type { PlasmoMessaging } from '@plasmohq/messaging'

import type { Video } from '~models/model.types'
import type { PostVideo } from '~models/request.types'

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
  return response
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

  res.send('success')
}

export default handler
