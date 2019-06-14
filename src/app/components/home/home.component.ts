import { Component } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;

    spotify.getToken();

    setTimeout(() => {
      this.spotify.getNewReleases().subscribe(
        (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
          //console.log(data);
        },
        errorServicio => {
          spotify.getToken();
        }
      );
    }, 1500);
  }
}
