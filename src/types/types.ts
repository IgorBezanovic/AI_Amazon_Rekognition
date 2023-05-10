export type Entities = {
  Score: number,
  Type: string,
  Text: string,
  BeginOffset: number,
  EndOffset: number
};

export type Event = {
  body: string
}

export type Request = {
  text?: string;
  languageCode?: string;
}