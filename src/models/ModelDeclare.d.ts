export declare interface RegisterNow {
  id?: number;
  email: string;
  phoneNumber: string;
  name: string;
  sent?: number;
  createdDate?: string;
}

export declare interface WinfunEvent {
  id?: number;
  eventName: string;
  createdDate?: string;
  location: string;
  beginDatetime: string;
  endDatetime: string;
  descriptions?: string;
  detailLink: string;
  show?: number;
  sequence?: number;
  imageURI?: string;
}

export declare interface AnonymousComment {
  id?: number;
  email: string;
  phoneNumber: string;
  name: string;
  contents: string;
  sequence: number;
  userImage?: string;
  createdDate?: string;
  show?: number
}
