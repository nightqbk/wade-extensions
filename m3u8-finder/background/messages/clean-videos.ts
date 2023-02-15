import type { PlasmoMessaging } from '@plasmohq/messaging'

import { cleanVideos } from '~services/TempVideoStorageService'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  await cleanVideos()

  res.send({})
}

export default handler
