export type ArrayFields<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends Array<any> ? K : never;
  }[keyof T]
>;
