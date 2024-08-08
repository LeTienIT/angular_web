import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet,FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private http : HttpClient){}
  	title = 'web_diary';
    check_love : boolean = false;
    check_data : boolean = false;
    noi_dung : string | undefined;
    so_xien : number | undefined;

    on_check_love(event: Event){
        const isChecked = (event.target as HTMLInputElement).checked;
        if(isChecked)
        {
            this.check_love = true;
        }
        else{
            this.check_love = false;
        }
    }
    luu_click(){
        if(this.noi_dung && this.so_xien)
        {
            const now = new Date();
            const month = now.getMonth()+1;
            const year = now.getFullYear();
            const folderPath = `./tieu_tien`;
            const fileName = `tieu_tien_${month}_${year}.txt`;
            const filePath = `${folderPath}/${fileName}`;
            const data = this.check_love ? `${now}\t${this.noi_dung}\t${this.so_xien}\t♥️` : `${now}\t${this.noi_dung}\t${this.so_xien}`;

            this.http.post<any>("http://localhost:3000/write-file/",{folderPath,filePath,data}).subscribe({
             	 next: (response)=>{
                	alert(response.message);
                	console.log(response);
              	},
              	error: (e) =>{
                	console.log(e);
              	},
            });
        }
        else
        {
            alert('Vui lòng nhập nội dung và số xíu');
        }
    }
}
