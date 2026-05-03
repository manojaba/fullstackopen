sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the js file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser:the json file
    deactivate server

     Note right of browser: The browser executes the callback function that renders the notes

     Note right of browser: a value is submitted in the form 

     browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
     activate server
     Note right of server: the value is stored in the list and 201 status is sent back
     Note right of browser: JS adds the new note to the list without reloading
     server-->>browser: note created json message send back
     deactivate server
     


