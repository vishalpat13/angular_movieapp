import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reco',
  templateUrl: './reco.component.html',
  styleUrls: ['./reco.component.scss']
})

export class RecoComponent implements OnInit {
  api_key: string = 'bd5e7f8161070f86bff1d8da34219f57'
  data: any;
  data_2: any;

  constructor(private tmdb_endpoint:HttpClient) { }

  ngOnInit(): void {
    this.getRecommendations('top_rated');
    this.getRecommendations('upcoming');
  }

  getRecommendations(movieType: string){
    let endpoint_url = ''
    if (movieType === 'top_rated') {
        endpoint_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.api_key}`;
        let results = this.tmdb_endpoint.get<UserResponse>(endpoint_url).subscribe(data => {
          this.data = data;
          console.log(data);
        },
        err => {
          console.log(err);
        });
        return results
    }
    else {
        endpoint_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.api_key}`;
        let results = this.tmdb_endpoint.get<UserResponse>(endpoint_url).subscribe(data => {
          this.data_2 = data;
          console.log(data);
        },
        err => {
          console.log(err);
        });
        return results
    }
   
  }

  // OWL CAROUSEL CONFIG
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    autoWidth: true,
    margin: 0,
    nav: true,
    items: 7
  }
}

//  BELOW INTERFACES FOR PARSING JSON OBJECT
interface UserResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Results[];
  ok: number;
  length: number;
}

interface Results {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  id: number;
  vote_average: number;
  vote_count: number;
  title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  length: number;
}

interface GenreTy {
  [key: number]: string;
}