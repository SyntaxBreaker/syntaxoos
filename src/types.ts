export interface FileList {
  [key: string]: {
    id: number;
    name: string;
    imgSrc?: string;
    content?: string;
  }[];
}
