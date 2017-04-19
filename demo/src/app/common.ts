import {TableItem} from "@nodeart/ngfb_sortable_table";

export class Common implements TableItem {
    public item: Object;
    public index: number;
    public imageUrl: string;
    public loadImg(event): void {
        event.target.style.opacity = 1;
    }
    public getImage() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://randomuser.me/api/?inc=picture', true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.response)['results'][0]['picture']['thumbnail']);
                }
            }
        })
    }
}