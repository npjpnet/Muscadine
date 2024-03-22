import type { MuscadineAccessLevel } from 'muscadine'

declare module 'firebase/auth' {
  interface ParsedToken {
    accessLevel: MuscadineAccessLevel
  }
}
