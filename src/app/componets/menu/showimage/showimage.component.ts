import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services';
import { imageModel } from '../../../models/image.model'

@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.component.html',
  styleUrls: ['./showimage.component.css'],
  providers:[PostService]
})
export class ShowimageComponent implements OnInit {
  public keyword:string;
  public images:imageModel[]=[];

  constructor( private Service:PostService,) {

   }

  ngOnInit() {
  }

  searchImages() {
    this.Service.getimages(this.keyword).subscribe(post => {
      this.images=post;
      alert( this.images.length)
     })

     
  }
}
