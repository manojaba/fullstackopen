sequenceDiagram
   participant browser
   participant server


   browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
   activate server
   server->> browser: HTML document
   deactivate server

   browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
   activate server
   server->> browser: the CSS file
   deactivate server

   browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
   activate server
   server->> browser:the js file
   deactivate server

   Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

   browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
   activate server
   server->>browser: [{content: "getting a j*b is impossible ", date: "2026-05-02T13:11:07.911Z"},…]
   deactivate server

   Note right of browser: The browser executes the callback function that renders the notes

   Note right of browser: the form is filled and submitted

   browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (sends text of the note)
   activate server
   Note right of server: server saves the note and redirects the request to another link
   server->>browser: 302 - redirects to /exampleapp/notes
   deactivate server

   
   browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
   activate server
   server->> browser: HTML document
   deactivate server

   browser->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
   activate server
   server->> browser: the CSS file
   deactivate server

   browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
   activate server
   server->> browser:the js file
   deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

   browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
   activate server
   server->>browser: [{content: "getting a j*b is impossible ", date: "2026-05-02T13:11:07.911Z"},…]
   deactivate server


   
   




