export interface IService<T> {
  create(data: T): Promise<T>,
  read(): Promise<T[] | null>,
  readOne(id: string):Promise<T | null>,
  update(id: string, data: T):Promise<T | null>,
  delete(id: string):Promise<T | null>,
}