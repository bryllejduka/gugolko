export type SyncEntity<T> = T & {
  _status?: "created" | "updated" | "deleted";
};
