import * as functions from 'firebase-functions'
import HelloWorldService from '../services/HelloWorldService'

export const helloWorld = functions.https
  .onRequest(async (_, res) => {
    const result = HelloWorldService.helloworld()
    res.send(result)
  })

export const ping = functions.https
  .onRequest(async (_, res) => {
    const result = HelloWorldService.ping()
    res.send(result)
  })
