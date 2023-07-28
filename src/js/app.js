import { SplashScreen } from '@capacitor/splash-screen';
import { SalesforceNetworkPlugin } from 'SalesforceMobileSDK-Capacitor-Plugin';

window.customElements.define(
  'contact-list',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `  
    <style>
    ul {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      background-color: #ffffff;
      padding: 16px;
      border-bottom: 1px solid #d9d9d9;
      font-size: 16px;
      color: #333333;
    }
    
    li:last-child {
      border-bottom: none;
    }
    </style>    
    <ul id="list" />
    `;
    }

    connectedCallback() {
      const self = this;
      const soql = "SELECT Id, Name FROM Contact LIMIT 100";
      const request = {
        method: "GET",
        endPoint: "/services/data",
        path: "/v55.0/query",
        queryParams: JSON.stringify({q: soql})
      };

      (async () => {
        const response = await SalesforceNetworkPlugin.sendRequest(request);
        const contacts = JSON.parse(response.body).records;
        const ul = self.shadowRoot.querySelector("#list");
        for (var i=0; i < contacts.length; i++) {
          const li = document.createElement("li");
          li.textContent = contacts[i].Name;
          ul.appendChild(li);
        }
      })();
    }
});


window.customElements.define(
  'title-bar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);