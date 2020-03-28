import { Credentials } from '@textile/threads-client-grpc/api_pb'
import { ThreadID } from '@textile/threads-core'
/**
 * Credentials for a Thread DB
 */
export class Creds {
  constructor(public DBID: Uint8Array | string, public pubKey?: string | Uint8Array, public signature?: string | Uint8Array) {}
  grpcObject(): Credentials {
    const creds = new Credentials()
    creds.setThreadid(this.DBID)
    if (this.pubKey) {
      creds.setPubkey(this.pubKey)
    }
    if (this.signature) {
      creds.setSignature(this.signature)
    }
    return creds
  }

  static defaultWithRandomID() {
    const threadId = ThreadID.fromRandom()
    const id = threadId.bytes()
    return new Creds(id)
  }
}

/**
 * Instance is a singular Model instance.
 */
export interface Instance<T> {
  instance: T
}

/**
 * InstanceList is an array of Entities.
 */
export interface InstanceList<T> {
  instancesList: T[]
}

/**
 * Value represents a valid JSON data type.
 */
export type Value = string | boolean | number

/**
 * JSONValue is used by the gRPC server to handle JSON data types.
 */
export interface JSONValue {
  string?: string
  bool?: boolean
  float?: number
}

/**
 * JSONOperation defines the set of possible operations to be used in a Query.
 */
export enum JSONOperation {
  Eq = 0,
  Ne,
  Gt,
  Lt,
  Ge,
  Le,
}

/**
 * JSONCriterion represents a single Query criteria.
 */
export interface JSONCriterion {
  fieldPath?: string
  operation?: JSONOperation
  value?: JSONValue
  query?: JSONQuery
}

/**
 * JSONSort describes how and what field on which to sort a query.
 */
export interface JSONSort {
  fieldPath: string
  desc: boolean
}

/**
 * JSONQuery represents a single store Query.
 */
export interface JSONQuery {
  ands?: JSONCriterion[]
  ors?: JSONQuery[]
  sort?: JSONSort
}
