export interface IChild {
    id: number;
    name: string;
    age: number;
    wishes: IWish[];
}

export interface IWish{
    id: number;
    name: string;
    url: string;
    img_url: string;
}