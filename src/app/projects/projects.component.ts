import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  
    
    open(modelId:any) {
		this.modalService.open(modelId);
	}
    
    allProjects = [
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-1.jpg",
          client_name: "Alex Noer",
          supervisor_image: "assets/images/projects/Untitled-2.jpg",
          supervisor_name: "Yoast Esec",
          deadline:"Tuesday,Sep 29th 2020",
          status: "Pending",
          status_class: "btn-warning",
          url: "admin/post-details",
        },
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-3.jpg",
          client_name: "Kevin Sigh",
          supervisor_image: "assets/images/projects/Untitled-4.jpg",
          supervisor_name: "Yuri Hanako",
          deadline:"Tuesday,Sep 29th 2020",
          status: "ON PROGERSS",
          status_class: "btn-info",
          url: "admin/post-details",
        },
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-5.jpg",
          client_name: "Endge Aes",
          supervisor_image: "assets/images/projects/Untitled-6.jpg",
          supervisor_name: "Peter Parkur",
          deadline:"Tuesday,Sep 29th 2020",
          status: "CLOSED",
          status_class: "btn-danger",
          url: "admin/post-details",
        },
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-7.jpg",
          client_name: "Angela Moss",
          supervisor_image: "assets/images/projects/Untitled-8.jpg",
          supervisor_name: "Olivia Jonson",
          deadline:"Tuesday,Sep 29th 2020",
          status: "ON PROGERSS",
          status_class: "btn-info",
          url: "admin/post-details",
        },
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-9.jpg",
          client_name: "Tiffany",
          supervisor_image: "assets/images/projects/Untitled-10.jpg",
          supervisor_name: "Bella Sirait",
          deadline:"Tuesday,Sep 29th 2020",
          status: "Pending",
          status_class: "btn-warning",
          url: "admin/post-details",
        },
    ];
    
    onProgress = [
        {
          id: "#P-000441425",
          title: "Manage SEO for Eclan Company P..",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-7.jpg",
          client_name: "Angela Moss",
          supervisor_image: "assets/images/projects/Untitled-8.jpg",
          supervisor_name: "Olivia Jonson",
          deadline:"Tuesday,Sep 29th 2020",
          status: "ON PROGERSS",
          status_class: "btn-info",
          url: "admin/post-details",
        },
        {
          id: "#P-000441425",
          title: "Build Branding Persona for Etza.id",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-3.jpg",
          client_name: "Kevin Sigh",
          supervisor_image: "assets/images/projects/Untitled-4.jpg",
          supervisor_name: "Yuri Hanako",
          deadline:"Tuesday,Sep 29th 2020",
          status: "ON PRORESS",
          status_class: "btn-info",
          url: "admin/post-details",
        },
    ];
    
    
    
    allPending = [
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-9.jpg",
          client_name: "Tiffany",
          supervisor_image: "assets/images/projects/Untitled-10.jpg",
          supervisor_name: "Bella Sirait",
          deadline:"Tuesday,Sep 29th 2020",
          status: "Pending",
          status_class: "btn-warning",
          url: "admin/post-details",
        },
        {
          id: "#P-000441425",
          title: "Redesign Kripton Mobile App",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-1.jpg",
          client_name: "Alex Noer",
          supervisor_image: "assets/images/projects/Untitled-2.jpg",
          supervisor_name: "Yoast Esec",
          deadline:"Tuesday,Sep 29th 2020",
          status: "Pending",
          status_class: "btn-warning",
          url: "admin/post-details",
        },
    ];
    
    allClosed = [
        {
          id: "#P-000441425",
          title: "Reduce Website Page Size Omah",
          date: "Sep 8th, 2020",
          client_image: "assets/images/projects/Untitled-5.jpg",
          client_name: "Endge Aes",
          supervisor_image: "assets/images/projects/Untitled-6.jpg",
          supervisor_name: "Peter Parkur",
          deadline:"Tuesday,Sep 29th 2020",
          status: "CLOSED",
          status_class: "btn-warning",
          url: "admin/post-danger",
        },
    ];

}
