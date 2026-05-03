
   Note right of browser: a value is submitted in the form 
   Note right of browser: the js script prevents the default relaoad of the browser and sends a post request to the server

     browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
     activate server
     Note right of server: the value is stored in the list and 201 status is sent back
     Note right of browser: JS adds the new note to the list without reloading
     server-->>browser: note created json message send back
     deactivate server
