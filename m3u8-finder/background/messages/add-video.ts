import type { PlasmoMessaging } from '@plasmohq/messaging'

import type { Video } from '~models/model.types'
import { addVideo } from '~services/VideoStorageService'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const video = req.body.video as Video
  if (video) {
    await addVideo(video)
  }

  res.send(video)
}

export default handler
