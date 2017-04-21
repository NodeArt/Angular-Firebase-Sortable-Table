import { TableItem } from "@nodeart/ngfb_sortable_table";

interface Employee {
    name: string;
    age: number;
    gender: string;
    country: string;
    job: string;
    cv: string;
    inSearch: boolean;
    favoriteFramework: string;
}

interface Employer {
    name: string;
    country: string;
    address: string;
    phone: string;
    lookingFor: string;
    email: string;
}

export class Common implements TableItem {
    public item: Employee | Employer;
    public index: number;
    public imageUrl: string;
    public loadImg(event): void {
        event.target.style.opacity = 1;
    }
    public getImage(size) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/?inc=picture', true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.imageUrl = JSON.parse(xhr.response)['results'][0]['picture'][size];
            }
        };
        xhr.onerror = () => this.imageUrl = '';
    }
}