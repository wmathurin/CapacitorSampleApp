import { SplashScreen } from '@capacitor/splash-screen';
import { SDKInfoPlugin } from 'SalesforceMobileSDK-Capacitor-Plugin';

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
    <ul>
      <li>James Bond</li>
      <li>Jason Bourne</li>
    </ul>  
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#show-sdk-info').addEventListener('click', async function (e) {
        const sdkInfo = await SDKInfoPlugin.getInfo();
        alert(JSON.stringify(sdkInfo));
      });
    }
  }
);

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


  //   /* Do login */
  //   force.login(
  //     function() {
  //         console.log("Auth succeeded"); 
  //         showContactsList();
  //     },
  //     function(error) {
  //         console.log("Auth failed: " + error); 
  //     }
  // );

  // /* This method will render a list of contacts from current salesforce org */
  // var showContactsList = function() {

  //     fetchRecords(function(data) {
  //         var contacts = data.records;

  //         var listItemsHtml = '';
  //         for (var i=0; i < contacts.length; i++) {
  //             listItemsHtml += ('<li class="table-view-cell"><div class="media-body">' + contacts[i].Name + '</div></li>');
  //         }

  //         document.querySelector('#contacts').innerHTML = listItemsHtml;
  //     })
  // }

  // /* This method will fetch a list of contact records from salesforce.
  // Just change the soql query to fetch another sobject. */
  // var fetchRecords = function (successHandler) {
  //     var soql = 'SELECT Id, Name FROM Contact LIMIT 100';
  //     force.query(soql, successHandler, function(error) {
  //         alert('Failed to fetch contacts: ' + error);
  //     });
  // };
