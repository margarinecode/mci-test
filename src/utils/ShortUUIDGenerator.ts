import shortUUID from 'short-uuid';

export interface ShortUUIDGeneratorOptions {
  prefix?: string
}

export function shortUUIDGenerator(options?: ShortUUIDGeneratorOptions) {
  const id = shortUUID().generate();
  if (options?.prefix) {
    return `${options.prefix}${id}`;
  }
  return id;
}