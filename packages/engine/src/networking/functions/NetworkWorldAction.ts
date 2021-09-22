import matches from 'ts-matches'
import {
  defineActionCreator,
  matchesNetworkId,
  matchesQuaternion,
  matchesUserId,
  matchesVector3,
  matchesWithInitializer
} from '../interfaces/Action'
import { Network } from '../classes/Network'
import { matchesWeightsParameters } from '../../avatar/animations/Util'
import { matchPose } from '../../transform/TransformInterfaces'
import { matchesAvatarProps } from '../interfaces/WorldState'

export class NetworkWorldAction {
  static createClient = defineActionCreator({
    type: 'network.CREATE_CLIENT',
    userId: matchesUserId,
    avatarDetail: matchesAvatarProps
  })

  static destroyClient = defineActionCreator({
    type: 'network.DESTROY_CLIENT',
    userId: matchesUserId
  })

  static setXRMode = defineActionCreator(
    {
      type: 'network.SET_XR_MODE',
      userId: matchesUserId,
      enabled: matches.boolean
    },
    { allowDispatchFromAny: true }
  )

  static spawnObject = defineActionCreator({
    type: 'network.SPAWN_OBJECT',
    userId: matchesUserId,
    prefab: matches.string,
    networkId: matchesWithInitializer(matchesNetworkId, () => Network.getNetworkId()),
    parameters: matches.any.optional()
  })

  static spawnAvatar = defineActionCreator({
    ...NetworkWorldAction.spawnObject.actionShape,
    prefab: 'avatar',
    parameters: matches.shape({
      position: matchesVector3,
      rotation: matchesQuaternion
    })
  })

  static destroyObject = defineActionCreator({
    type: 'network.DESTROY_OBJECT',
    networkId: matchesNetworkId
  })

  static setEquippedObject = defineActionCreator({
    type: 'network.SET_EQUIPPED_OBJECT',
    networkId: matchesNetworkId,
    equip: matches.boolean
  })

  static avatarAnimation = defineActionCreator(
    {
      type: 'network.ANIMATION_CHANGE',
      newStateName: matches.string,
      params: matchesWeightsParameters
    },
    { allowDispatchFromAny: true }
  )

  static teleportObject = defineActionCreator({
    type: 'network.TELEPORT_OBJECT',
    networkId: matchesNetworkId,
    pose: matchPose
  })
}
