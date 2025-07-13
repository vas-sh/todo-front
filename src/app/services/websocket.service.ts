import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private url = "ws://localhost:8080/api/ws?token=";
  private socket?: WebSocket;
  public messages = new Subject<string>();

  constructor(
  ) { }

  connect(token: string | null): void {
    this.socket = new WebSocket(this.url+token);
    this.socket.onmessage = (event) => {
      this.messages.next(event.data);
    };
  }
}